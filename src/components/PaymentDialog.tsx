import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useKV } from '@github/spark/hooks'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'
import { CreditCard, DeviceMobile, CheckCircle, Warning } from '@phosphor-icons/react'
import type { TourPackage } from '@/lib/types'
import { getStripeService, type StripePaymentData } from '@/lib/stripe'
import { getMpesaService, type MpesaPaymentData } from '@/lib/mpesa'

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tour: TourPackage | null
}

interface CardPaymentForm {
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
  email: string
  phone: string
}

interface MpesaPaymentForm {
  phoneNumber: string
  email: string
  fullName: string
}

interface PaymentTransaction {
  id: string
  tourId: string
  tourTitle: string
  amount: number
  paymentMethod: 'card' | 'mpesa'
  status: 'pending' | 'completed' | 'failed'
  transactionId?: string
  customerEmail: string
  customerPhone: string
  timestamp: number
}

export function PaymentDialog({ open, onOpenChange, tour }: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mpesa'>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null)
  const [transactions, setTransactions] = useKV<PaymentTransaction[]>('payment-transactions', [])

  const cardForm = useForm<CardPaymentForm>()
  const mpesaForm = useForm<MpesaPaymentForm>()

  if (!tour) return null

  const saveTransaction = (transaction: PaymentTransaction) => {
    setTransactions((current) => [...(current || []), transaction])
  }

  const handleCardPayment = async (data: CardPaymentForm) => {
    setIsProcessing(true)
    setPaymentError(null)
    
    try {
      const stripeService = getStripeService()
      
      const paymentData: StripePaymentData = {
        amount: tour.price,
        currency: 'usd',
        cardNumber: data.cardNumber,
        cardName: data.cardName,
        expiryDate: data.expiryDate,
        cvv: data.cvv,
        email: data.email,
        description: `Booking: ${tour.title}`
      }

      const result = await stripeService.confirmCardPayment(paymentData)

      if (result.success) {
        const transaction: PaymentTransaction = {
          id: `txn_${Date.now()}`,
          tourId: tour.id,
          tourTitle: tour.title,
          amount: tour.price,
          paymentMethod: 'card',
          status: 'completed',
          transactionId: result.transactionId,
          customerEmail: data.email,
          customerPhone: data.phone,
          timestamp: Date.now()
        }

        saveTransaction(transaction)
        setPaymentSuccess(true)
        toast.success('Payment successful! You will receive a confirmation email shortly.')
        
        setTimeout(() => {
          setIsProcessing(false)
          setPaymentSuccess(false)
          cardForm.reset()
          onOpenChange(false)
        }, 2500)
      } else {
        setPaymentError(result.message)
        toast.error(result.message)
        setIsProcessing(false)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed'
      setPaymentError(errorMessage)
      toast.error(errorMessage)
      setIsProcessing(false)
    }
  }

  const handleMpesaPayment = async (data: MpesaPaymentForm) => {
    setIsProcessing(true)
    setPaymentError(null)
    
    try {
      const mpesaService = getMpesaService()
      
      const paymentData: MpesaPaymentData = {
        phoneNumber: data.phoneNumber,
        amount: tour.price,
        accountReference: `TOUR-${tour.id}`,
        transactionDesc: `Booking for ${tour.title}`
      }

      const result = await mpesaService.initiateSTKPush(paymentData)

      if (result.success) {
        setCheckoutRequestId(result.checkoutRequestId || null)
        toast.success('M-Pesa prompt sent! Please check your phone and enter your M-Pesa PIN.')
        
        const transaction: PaymentTransaction = {
          id: `txn_${Date.now()}`,
          tourId: tour.id,
          tourTitle: tour.title,
          amount: tour.price,
          paymentMethod: 'mpesa',
          status: 'pending',
          transactionId: result.checkoutRequestId,
          customerEmail: data.email,
          customerPhone: data.phoneNumber,
          timestamp: Date.now()
        }

        saveTransaction(transaction)

        setTimeout(async () => {
          if (result.checkoutRequestId) {
            const statusResult = await mpesaService.querySTKPushStatus(result.checkoutRequestId)
            
            if (statusResult.status === 'completed') {
              setPaymentSuccess(true)
              toast.success('Payment confirmed! You will receive a confirmation email shortly.')
              
              setTimeout(() => {
                setIsProcessing(false)
                setPaymentSuccess(false)
                mpesaForm.reset()
                onOpenChange(false)
              }, 2500)
            } else if (statusResult.status === 'failed') {
              setPaymentError(statusResult.message)
              toast.error(statusResult.message)
              setIsProcessing(false)
            } else {
              toast.info('Payment is still pending. We will notify you once completed.')
              setIsProcessing(false)
              mpesaForm.reset()
              onOpenChange(false)
            }
          }
        }, 30000)
      } else {
        setPaymentError(result.message)
        toast.error(result.message)
        setIsProcessing(false)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'M-Pesa payment failed'
      setPaymentError(errorMessage)
      toast.error(errorMessage)
      setIsProcessing(false)
    }
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '')
    const chunks = cleaned.match(/.{1,4}/g)
    return chunks ? chunks.join(' ') : cleaned
  }

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
    }
    return cleaned
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Complete Your Booking</DialogTitle>
          <DialogDescription>
            Secure payment for {tour.title}
          </DialogDescription>
        </DialogHeader>

        {paymentSuccess ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle weight="fill" className="text-green-500 mx-auto text-6xl animate-bounce-in" />
            <h3 className="text-2xl font-semibold text-green-600">Payment Successful!</h3>
            <p className="text-muted-foreground">Thank you for booking with Jimfire Safaris</p>
          </div>
        ) : (
          <>
            <div className="bg-accent/10 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{tour.title}</span>
                <span className="text-sm text-muted-foreground">{tour.duration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-primary">${tour.price}</span>
              </div>
            </div>

            {paymentError && (
              <Alert variant="destructive">
                <Warning className="h-4 w-4" />
                <AlertDescription>{paymentError}</AlertDescription>
              </Alert>
            )}

            <Separator />

            <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'card' | 'mpesa')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="card" className="flex items-center gap-2">
                  <CreditCard weight="bold" />
                  Credit Card
                </TabsTrigger>
                <TabsTrigger value="mpesa" className="flex items-center gap-2">
                  <DeviceMobile weight="bold" />
                  M-Pesa
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="space-y-4 mt-6">
                <form onSubmit={cardForm.handleSubmit(handleCardPayment)} className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      {...cardForm.register('cardNumber', {
                        required: 'Card number is required',
                        onChange: (e) => {
                          e.target.value = formatCardNumber(e.target.value)
                        }
                      })}
                    />
                    {cardForm.formState.errors.cardNumber && (
                      <p className="text-sm text-destructive mt-1">
                        {cardForm.formState.errors.cardNumber.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cardName">Cardholder Name *</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      {...cardForm.register('cardName', { required: 'Cardholder name is required' })}
                    />
                    {cardForm.formState.errors.cardName && (
                      <p className="text-sm text-destructive mt-1">
                        {cardForm.formState.errors.cardName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        maxLength={5}
                        {...cardForm.register('expiryDate', {
                          required: 'Expiry date is required',
                          onChange: (e) => {
                            e.target.value = formatExpiryDate(e.target.value)
                          }
                        })}
                      />
                      {cardForm.formState.errors.expiryDate && (
                        <p className="text-sm text-destructive mt-1">
                          {cardForm.formState.errors.expiryDate.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        {...cardForm.register('cvv', {
                          required: 'CVV is required',
                          pattern: {
                            value: /^\d{3,4}$/,
                            message: 'Invalid CVV'
                          }
                        })}
                      />
                      {cardForm.formState.errors.cvv && (
                        <p className="text-sm text-destructive mt-1">
                          {cardForm.formState.errors.cvv.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="card-email">Email Address *</Label>
                    <Input
                      id="card-email"
                      type="email"
                      placeholder="your@email.com"
                      {...cardForm.register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                    {cardForm.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {cardForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="card-phone">Phone Number *</Label>
                    <Input
                      id="card-phone"
                      type="tel"
                      placeholder="+254 123 456 789"
                      {...cardForm.register('phone', { required: 'Phone number is required' })}
                    />
                    {cardForm.formState.errors.phone && (
                      <p className="text-sm text-destructive mt-1">
                        {cardForm.formState.errors.phone.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Pay $${tour.price}`}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Your payment is secured with 256-bit SSL encryption
                  </p>
                </form>
              </TabsContent>

              <TabsContent value="mpesa" className="space-y-4 mt-6">
                <div className="bg-primary/5 p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <DeviceMobile weight="fill" className="text-primary" />
                    How M-Pesa Payment Works
                  </h4>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Enter your M-Pesa registered phone number</li>
                    <li>Click "Send M-Pesa Prompt"</li>
                    <li>Check your phone for the M-Pesa payment prompt</li>
                    <li>Enter your M-Pesa PIN to complete payment</li>
                  </ol>
                </div>

                <form onSubmit={mpesaForm.handleSubmit(handleMpesaPayment)} className="space-y-4">
                  <div>
                    <Label htmlFor="mpesa-name">Full Name *</Label>
                    <Input
                      id="mpesa-name"
                      placeholder="John Doe"
                      {...mpesaForm.register('fullName', { required: 'Full name is required' })}
                    />
                    {mpesaForm.formState.errors.fullName && (
                      <p className="text-sm text-destructive mt-1">
                        {mpesaForm.formState.errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber">M-Pesa Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="254712345678"
                      {...mpesaForm.register('phoneNumber', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^254[17]\d{8}$/,
                          message: 'Please enter a valid Kenyan phone number (e.g., 254712345678)'
                        }
                      })}
                    />
                    {mpesaForm.formState.errors.phoneNumber && (
                      <p className="text-sm text-destructive mt-1">
                        {mpesaForm.formState.errors.phoneNumber.message}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Format: 254712345678 (no spaces or + symbol)
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="mpesa-email">Email Address *</Label>
                    <Input
                      id="mpesa-email"
                      type="email"
                      placeholder="your@email.com"
                      {...mpesaForm.register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                    {mpesaForm.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {mpesaForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Sending Prompt...' : 'Send M-Pesa Prompt'}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    You will receive an M-Pesa prompt on your phone
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
