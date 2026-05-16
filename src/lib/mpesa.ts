interface MpesaAuthResponse {
  access_token: string
  expires_in: string
}

interface MpesaSTKPushResponse {
  MerchantRequestID: string
  CheckoutRequestID: string
  ResponseCode: string
  ResponseDescription: string
  CustomerMessage: string
}

interface MpesaCallbackResponse {
  Body: {
    stkCallback: {
      MerchantRequestID: string
      CheckoutRequestID: string
      ResultCode: number
      ResultDesc: string
      CallbackMetadata?: {
        Item: Array<{
          Name: string
          Value: string | number
        }>
      }
    }
  }
}

export interface MpesaPaymentData {
  phoneNumber: string
  amount: number
  accountReference: string
  transactionDesc: string
}

export interface MpesaPaymentResult {
  success: boolean
  checkoutRequestId?: string
  message: string
  error?: string
}

const MPESA_API_URL = 'https://api.safaricom.co.ke'
const SANDBOX_API_URL = 'https://sandbox.safaricom.co.ke'

interface MpesaConfig {
  consumerKey: string
  consumerSecret: string
  businessShortCode: string
  passkey: string
  callbackUrl: string
  environment: 'sandbox' | 'production'
}

export class MpesaPaymentService {
  private config: MpesaConfig
  private accessToken: string | null = null
  private tokenExpiry: number = 0

  constructor(config: MpesaConfig) {
    this.config = config
  }

  private get apiUrl(): string {
    return this.config.environment === 'production' ? MPESA_API_URL : SANDBOX_API_URL
  }

  private async authenticate(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    const auth = btoa(`${this.config.consumerKey}:${this.config.consumerSecret}`)

    const response = await fetch(`${this.apiUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to authenticate with M-Pesa API')
    }

    const data: MpesaAuthResponse = await response.json()
    this.accessToken = data.access_token
    this.tokenExpiry = Date.now() + (parseInt(data.expires_in) - 60) * 1000

    return this.accessToken
  }

  private generateTimestamp(): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${year}${month}${day}${hours}${minutes}${seconds}`
  }

  private generatePassword(timestamp: string): string {
    const data = `${this.config.businessShortCode}${this.config.passkey}${timestamp}`
    return btoa(data)
  }

  async initiateSTKPush(paymentData: MpesaPaymentData): Promise<MpesaPaymentResult> {
    try {
      const accessToken = await this.authenticate()
      const timestamp = this.generateTimestamp()
      const password = this.generatePassword(timestamp)

      const payload = {
        BusinessShortCode: this.config.businessShortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(paymentData.amount),
        PartyA: paymentData.phoneNumber,
        PartyB: this.config.businessShortCode,
        PhoneNumber: paymentData.phoneNumber,
        CallBackURL: this.config.callbackUrl,
        AccountReference: paymentData.accountReference,
        TransactionDesc: paymentData.transactionDesc
      }

      const response = await fetch(`${this.apiUrl}/mpesa/stkpush/v1/processrequest`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.errorMessage || 'Failed to initiate M-Pesa payment')
      }

      const data: MpesaSTKPushResponse = await response.json()

      if (data.ResponseCode === '0') {
        return {
          success: true,
          checkoutRequestId: data.CheckoutRequestID,
          message: data.CustomerMessage || 'Payment request sent successfully'
        }
      } else {
        return {
          success: false,
          message: data.ResponseDescription || 'Payment request failed',
          error: data.ResponseCode
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'M-Pesa payment error',
        error: 'MPESA_ERROR'
      }
    }
  }

  async querySTKPushStatus(checkoutRequestId: string): Promise<{
    success: boolean
    status: 'pending' | 'completed' | 'failed'
    message: string
  }> {
    try {
      const accessToken = await this.authenticate()
      const timestamp = this.generateTimestamp()
      const password = this.generatePassword(timestamp)

      const payload = {
        BusinessShortCode: this.config.businessShortCode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId
      }

      const response = await fetch(`${this.apiUrl}/mpesa/stkpushquery/v1/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Failed to query M-Pesa payment status')
      }

      const data = await response.json()

      if (data.ResultCode === '0') {
        return {
          success: true,
          status: 'completed',
          message: 'Payment completed successfully'
        }
      } else if (data.ResultCode === '1032') {
        return {
          success: false,
          status: 'failed',
          message: 'Payment cancelled by user'
        }
      } else if (data.ResultCode === '1') {
        return {
          success: false,
          status: 'failed',
          message: 'Insufficient balance'
        }
      } else {
        return {
          success: false,
          status: 'pending',
          message: data.ResultDesc || 'Payment still pending'
        }
      }
    } catch (error) {
      return {
        success: false,
        status: 'failed',
        message: error instanceof Error ? error.message : 'Failed to query payment status'
      }
    }
  }

  handleCallback(callbackData: MpesaCallbackResponse): {
    success: boolean
    transactionId?: string
    amount?: number
    phoneNumber?: string
    message: string
  } {
    const { stkCallback } = callbackData.Body

    if (stkCallback.ResultCode === 0) {
      const metadata = stkCallback.CallbackMetadata?.Item || []
      const amount = metadata.find(item => item.Name === 'Amount')?.Value
      const mpesaReceiptNumber = metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value
      const phoneNumber = metadata.find(item => item.Name === 'PhoneNumber')?.Value

      return {
        success: true,
        transactionId: mpesaReceiptNumber as string,
        amount: amount as number,
        phoneNumber: phoneNumber as string,
        message: 'Payment completed successfully'
      }
    } else {
      return {
        success: false,
        message: stkCallback.ResultDesc || 'Payment failed'
      }
    }
  }
}

export function getMpesaService(): MpesaPaymentService {
  const config: MpesaConfig = {
    consumerKey: import.meta.env.VITE_MPESA_CONSUMER_KEY || '',
    consumerSecret: import.meta.env.VITE_MPESA_CONSUMER_SECRET || '',
    businessShortCode: import.meta.env.VITE_MPESA_SHORTCODE || '',
    passkey: import.meta.env.VITE_MPESA_PASSKEY || '',
    callbackUrl: import.meta.env.VITE_MPESA_CALLBACK_URL || '',
    environment: (import.meta.env.VITE_MPESA_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox'
  }

  return new MpesaPaymentService(config)
}
