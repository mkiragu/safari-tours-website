interface StripePaymentIntent {
  id: string
  amount: number
  currency: string
  status: string
  client_secret: string
}

interface StripeConfig {
  publicKey: string
  secretKey: string
}

export interface StripePaymentData {
  amount: number
  currency: string
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
  email: string
  description: string
}

export interface PaymentResult {
  success: boolean
  transactionId?: string
  message: string
  error?: string
}

const STRIPE_API_URL = 'https://api.stripe.com/v1'

export class StripePaymentService {
  private config: StripeConfig

  constructor(publicKey: string, secretKey: string) {
    this.config = {
      publicKey,
      secretKey
    }
  }

  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<StripePaymentIntent> {
    const response = await fetch(`${STRIPE_API_URL}/payment_intents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        amount: (amount * 100).toString(),
        currency: currency.toLowerCase(),
        'automatic_payment_methods[enabled]': 'true'
      })
    })

    if (!response.ok) {
      throw new Error('Failed to create payment intent')
    }

    return await response.json()
  }

  async confirmCardPayment(paymentData: StripePaymentData): Promise<PaymentResult> {
    try {
      const paymentIntent = await this.createPaymentIntent(paymentData.amount, paymentData.currency)

      const [expMonth, expYear] = paymentData.expiryDate.split('/')

      const confirmResponse = await fetch(`${STRIPE_API_URL}/payment_intents/${paymentIntent.id}/confirm`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.secretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'payment_method_data[type]': 'card',
          'payment_method_data[card][number]': paymentData.cardNumber.replace(/\s/g, ''),
          'payment_method_data[card][exp_month]': expMonth,
          'payment_method_data[card][exp_year]': `20${expYear}`,
          'payment_method_data[card][cvc]': paymentData.cvv,
          'payment_method_data[billing_details][name]': paymentData.cardName,
          'payment_method_data[billing_details][email]': paymentData.email,
          'receipt_email': paymentData.email
        })
      })

      const result = await confirmResponse.json()

      if (result.status === 'succeeded') {
        return {
          success: true,
          transactionId: result.id,
          message: 'Payment successful'
        }
      } else {
        return {
          success: false,
          message: result.last_payment_error?.message || 'Payment failed',
          error: result.last_payment_error?.code
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Payment processing error',
        error: 'PAYMENT_ERROR'
      }
    }
  }

  async createCheckoutSession(data: {
    amount: number
    currency: string
    email: string
    description: string
    successUrl: string
    cancelUrl: string
  }): Promise<{ sessionId: string; url: string }> {
    const response = await fetch(`${STRIPE_API_URL}/checkout/sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'payment_method_types[]': 'card',
        'line_items[0][price_data][currency]': data.currency,
        'line_items[0][price_data][product_data][name]': data.description,
        'line_items[0][price_data][unit_amount]': (data.amount * 100).toString(),
        'line_items[0][quantity]': '1',
        mode: 'payment',
        customer_email: data.email,
        success_url: data.successUrl,
        cancel_url: data.cancelUrl
      })
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    const session = await response.json()
    return {
      sessionId: session.id,
      url: session.url
    }
  }
}

export function getStripeService(): StripePaymentService {
  const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY || ''
  const secretKey = import.meta.env.VITE_STRIPE_SECRET_KEY || ''
  
  return new StripePaymentService(publicKey, secretKey)
}
