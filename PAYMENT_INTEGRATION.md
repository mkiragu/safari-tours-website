# Payment Gateway Integration Guide

This application integrates with two payment gateways:
1. **Stripe** - For international credit/debit card payments
2. **Safaricom Daraja API (M-Pesa)** - For Kenya mobile money payments

## Setup Instructions

### 1. Stripe Integration

#### Getting Your API Keys

1. Create a Stripe account at https://stripe.com
2. Navigate to Developers → API keys
3. Copy your **Publishable key** (starts with `pk_test_` for testing)
4. Copy your **Secret key** (starts with `sk_test_` for testing)

#### Configuration

Add the following to your `.env` file:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_your_actual_key_here
VITE_STRIPE_SECRET_KEY=sk_test_your_actual_key_here
```

#### Testing

Use Stripe's test card numbers:
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **Requires Authentication**: 4000 0025 0000 3155
- **Expiry Date**: Any future date (e.g., 12/34)
- **CVV**: Any 3 digits (e.g., 123)

More test cards: https://stripe.com/docs/testing

### 2. M-Pesa Daraja API Integration

#### Getting Your API Credentials

1. Create an account at https://developer.safaricom.co.ke
2. Create a new app (select "Lipa Na M-Pesa Online")
3. Note down the following credentials:
   - **Consumer Key**
   - **Consumer Secret**
   - **Business Short Code** (Paybill or Till Number)
   - **Passkey** (for Lipa Na M-Pesa Online)

#### Configuration

Add the following to your `.env` file:

```env
# For testing, use sandbox environment
VITE_MPESA_ENVIRONMENT=sandbox
VITE_MPESA_CONSUMER_KEY=your_consumer_key_here
VITE_MPESA_CONSUMER_SECRET=your_consumer_secret_here
VITE_MPESA_SHORTCODE=174379
VITE_MPESA_PASSKEY=your_passkey_here
VITE_MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback
```

**Sandbox vs Production:**
- `sandbox` - Use for testing with test credentials from developer portal
- `production` - Use for live transactions with production credentials

#### Testing in Sandbox

1. Use Sandbox test credentials from the Safaricom Developer Portal
2. Download the Daraja Sandbox App from Google Play Store
3. Use test phone number: 254708374149
4. Test PIN: Any 4-digit number in sandbox

#### Production Setup

1. Apply for production credentials through the developer portal
2. Update environment to `production`
3. Use your actual paybill/till number
4. Set up a callback URL endpoint to handle payment notifications

### 3. Callback URL Setup

The M-Pesa API requires a callback URL to send payment confirmations. You need to set up a backend endpoint to handle these callbacks.

#### Option A: Using Your Own Server

Create an endpoint that:
1. Receives POST requests from Safaricom
2. Validates the callback data
3. Updates payment status in your database
4. Sends confirmation emails to customers

#### Option B: Using Webhook Services

For development/testing, you can use services like:
- **Ngrok** - https://ngrok.com (tunnels localhost to public URL)
- **Webhook.site** - https://webhook.site (inspect webhooks)

Example with Ngrok:
```bash
ngrok http 3000
# Copy the HTTPS URL and append /api/mpesa/callback
# Example: https://abc123.ngrok.io/api/mpesa/callback
```

## Payment Flow

### Credit Card Payment Flow

1. User clicks "Book Now" on a tour
2. Payment dialog opens with two tabs (Card/M-Pesa)
3. User fills in card details
4. System validates input
5. Stripe API processes payment
6. Success/failure message displayed
7. Transaction saved to local storage
8. Confirmation email sent (via Stripe)

### M-Pesa Payment Flow

1. User clicks "Book Now" on a tour
2. Payment dialog opens with two tabs (Card/M-Pesa)
3. User enters Kenyan phone number (format: 254XXXXXXXXX)
4. System initiates STK Push via Daraja API
5. User receives prompt on their phone
6. User enters M-Pesa PIN on phone
7. System queries payment status after 30 seconds
8. Success/failure message displayed
9. Transaction saved to local storage
10. Callback received from Safaricom (confirms payment)

## Currency Conversion

The application prices are in USD. For M-Pesa:
- The amount is automatically converted from USD to KES
- Current example: $1 = ~130 KES (adjust based on current rates)
- M-Pesa amounts are rounded to nearest shilling

## Transaction Storage

Payment transactions are stored locally using the Spark KV store:
- Key: `payment-transactions`
- Data includes: tour details, amount, payment method, status, timestamp
- Accessible by admins in the dashboard for reconciliation

## Security Best Practices

1. **Never commit API keys to Git**
   - Use `.env` file (already in `.gitignore`)
   - Use environment variables in production

2. **Use HTTPS in production**
   - Required for Stripe
   - Required for M-Pesa callbacks

3. **Validate all inputs**
   - Card number format
   - Phone number format (Kenya: 254XXXXXXXXX)
   - Expiry dates
   - CVV

4. **Handle errors gracefully**
   - Display user-friendly error messages
   - Log detailed errors server-side
   - Provide retry options

5. **Test thoroughly**
   - Use test cards and test phone numbers
   - Test failure scenarios
   - Test timeout scenarios
   - Test network errors

## Going Live

### Stripe

1. Activate your Stripe account
2. Complete business verification
3. Replace test keys with live keys (`pk_live_...` and `sk_live_...`)
4. Test with real cards (use small amounts)

### M-Pesa

1. Apply for production credentials
2. Go through Safaricom's approval process
3. Update to production environment
4. Ensure callback URL is accessible
5. Test with real phone numbers (small amounts)
6. Monitor callback logs for issues

## Troubleshooting

### Stripe Issues

- **"Invalid API key"** - Check if keys are correct and match (test with test, live with live)
- **"Card declined"** - Normal in testing, user should try different card
- **"Authentication required"** - Some cards require 3D Secure

### M-Pesa Issues

- **"Invalid phone number"** - Must be format 254XXXXXXXXX (no + or spaces)
- **"Timeout"** - User didn't complete payment within 30 seconds
- **"Insufficient balance"** - User doesn't have enough M-Pesa balance
- **"User cancelled"** - User cancelled the prompt on their phone
- **"Invalid access token"** - Check consumer key/secret
- **"Invalid shortcode/passkey"** - Verify credentials from developer portal

## Support

- **Stripe Support**: https://support.stripe.com
- **Daraja API Docs**: https://developer.safaricom.co.ke/Documentation
- **M-Pesa Support**: developer@safaricom.co.ke

## API Rate Limits

### Stripe
- Test mode: No strict limits
- Live mode: Contact Stripe for limits

### M-Pesa
- Sandbox: 10 requests per second
- Production: Varies by agreement with Safaricom

## Code Structure

- `src/lib/stripe.ts` - Stripe payment service
- `src/lib/mpesa.ts` - M-Pesa payment service
- `src/components/PaymentDialog.tsx` - Payment UI component
- Payment transactions stored in: `payment-transactions` KV key

## Additional Features

Consider implementing:
- [ ] Email notifications on successful payment
- [ ] SMS notifications (M-Pesa already sends default)
- [ ] Payment receipt generation (PDF)
- [ ] Refund handling
- [ ] Partial payment support
- [ ] Payment plans/installments
- [ ] Multi-currency support
- [ ] Payment analytics dashboard
