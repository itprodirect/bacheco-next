# Payment Implementation Guide

> **Version:** 2.0  
> **Last Updated:** January 29, 2026  
> **Purpose:** Wire/bank transfer payment flow for Bache & Co.

---

## Overview

Bache & Co. accepts **wire transfers and ACH bank transfers only**. This is intentional for several reasons:

1. **No chargebacks** - Wire transfers are final
2. **Lower fees** - No credit card processing fees (2.5-3.5%)
3. **Higher trust signal** - Serious buyers use wire transfers
4. **Better for high-value items** - Standard practice in numismatics

---

## Payment Flow

### Customer Journey

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CUSTOMER JOURNEY                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. BROWSE                                                          │
│     └─▶ Customer finds coin they want                               │
│                                                                      │
│  2. RESERVE                                                         │
│     └─▶ Fills out reservation form                                  │
│         • Name, email, phone                                        │
│         • Selected coin(s)                                          │
│         • Optional message                                          │
│                                                                      │
│  3. CONFIRMATION PAGE                                               │
│     └─▶ Sees order summary + wire instructions                      │
│         • Order reference number                                    │
│         • Total amount due                                          │
│         • Bank details for wire transfer                            │
│         • 72-hour payment deadline                                  │
│                                                                      │
│  4. EMAIL CONFIRMATION                                              │
│     └─▶ Receives email with same info                               │
│         • Can forward to their bank                                 │
│         • Has all details needed to send wire                       │
│                                                                      │
│  5. PAYMENT                                                         │
│     └─▶ Customer sends wire/ACH to your bank                        │
│         • Includes order reference in memo                          │
│         • Wire: Same day | ACH: 2-3 business days                   │
│                                                                      │
│  6. VERIFICATION                                                    │
│     └─▶ You verify payment received                                 │
│         • Check bank account                                        │
│         • Match reference number                                    │
│         • Send confirmation email to customer                       │
│                                                                      │
│  7. SHIPMENT                                                        │
│     └─▶ Ship coin with tracking                                     │
│         • Insured shipping                                          │
│         • Send tracking to customer                                 │
│         • Mark order as shipped                                     │
│                                                                      │
│  8. DELIVERY                                                        │
│     └─▶ Customer receives coin                                      │
│         • 7-day inspection period                                   │
│         • Follow up for review                                      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Admin Journey

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ADMIN JOURNEY                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. NEW ORDER ALERT                                                 │
│     └─▶ Email notification: "New Order - [Coin] - $[Amount]"        │
│                                                                      │
│  2. REVIEW ORDER                                                    │
│     └─▶ Check order details                                         │
│         • Verify coin is still in inventory                         │
│         • Note customer info                                        │
│         • Mark coin as "reserved" in system                         │
│                                                                      │
│  3. MONITOR PAYMENT                                                 │
│     └─▶ Check bank account for incoming wire                        │
│         • Match reference number to order                           │
│         • Verify amount matches                                     │
│                                                                      │
│  4. PAYMENT RECEIVED                                                │
│     └─▶ Confirm and prepare shipment                                │
│         • Mark order as "paid"                                      │
│         • Send payment confirmation email                           │
│         • Package coin securely                                     │
│                                                                      │
│  5. SHIP ORDER                                                      │
│     └─▶ Send insured, tracked shipment                              │
│         • USPS Registered Mail for high value                       │
│         • UPS/FedEx with insurance                                  │
│         • Update order with tracking                                │
│         • Email tracking to customer                                │
│                                                                      │
│  6. PAYMENT TIMEOUT (72 hours)                                      │
│     └─▶ If no payment received                                      │
│         • Send reminder at 48 hours                                 │
│         • Send final notice at 72 hours                             │
│         • Release coin back to inventory                            │
│         • Notify customer of cancellation                           │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Wire Transfer Instructions

### Template (Customize with your real bank details)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    PAYMENT INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Order Reference: ORD-2026012912345
Amount Due: $24,500.00
Payment Deadline: February 1, 2026 (72 hours from order)

─────────────────────────────────────────────────────────────
DOMESTIC WIRE TRANSFER
─────────────────────────────────────────────────────────────

Bank Name:       [Your Bank Name]
Bank Address:    [Bank Street Address]
                 [City, State ZIP]

Routing Number:  [ABA Routing Number - 9 digits]
Account Number:  [Your Account Number]
Account Name:    Bache & Co. / IT Pro Direct LLC
Account Type:    Business Checking

Wire Reference:  ORD-2026012912345

─────────────────────────────────────────────────────────────
ACH / BANK TRANSFER (Slower - 2-3 Business Days)
─────────────────────────────────────────────────────────────

Same routing and account numbers as above.
Use "ORD-2026012912345" as the memo/reference.

─────────────────────────────────────────────────────────────
INTERNATIONAL WIRE (If applicable)
─────────────────────────────────────────────────────────────

SWIFT/BIC Code:  [Your bank's SWIFT code]
Bank Name:       [Your Bank Name]
Bank Address:    [Full address including country]

Intermediary Bank (if required):
Bank Name:       [Intermediary bank if needed]
SWIFT Code:      [Intermediary SWIFT]

Wire Reference:  ORD-2026012912345

─────────────────────────────────────────────────────────────
IMPORTANT NOTES
─────────────────────────────────────────────────────────────

✓ Include your Order Reference (ORD-XXXXX) in the memo field
✓ Payment must be received within 72 hours to hold your coin
✓ Wire transfers typically arrive same day
✓ ACH transfers take 2-3 business days
✓ International wires may take 3-5 business days

Questions? Contact nick@itprodirect.com or call [phone]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Order Data Model

```typescript
// src/types/order.ts

export type OrderStatus = 
  | 'pending_payment'
  | 'payment_received'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export interface OrderItem {
  sku: string;
  name: string;
  price: number;
  quantity: number;
  images: {
    thumbnail: string;
  };
}

export interface Customer {
  name: string;
  email: string;
  phone?: string;
}

export interface Order {
  // Identification
  orderId: string;              // ORD-[timestamp]
  
  // Customer
  customer: Customer;
  
  // Items
  items: OrderItem[];
  
  // Pricing
  subtotal: number;
  shipping: number;             // Usually $0 (free insured shipping)
  total: number;
  
  // Status
  status: OrderStatus;
  
  // Timestamps
  createdAt: string;            // ISO date
  paymentDeadline: string;      // ISO date (createdAt + 72 hours)
  paidAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  
  // Shipping
  shippingMethod?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  
  // Notes
  customerNotes?: string;
  internalNotes?: string;
  
  // Wire Reference
  wireReference: string;        // Same as orderId
}
```

---

## Reservation Form

### Form Fields

```typescript
interface ReservationFormData {
  // Required
  name: string;
  email: string;
  
  // Optional but recommended
  phone?: string;
  
  // Auto-populated from cart/product page
  items: {
    sku: string;
    quantity: number;
  }[];
  
  // Optional
  notes?: string;
  
  // Terms acceptance
  acceptedTerms: boolean;
}
```

### Validation Schema (Zod)

```typescript
// src/lib/validation.ts
import { z } from 'zod';

export const reservationSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z.string()
    .email('Please enter a valid email address'),
  
  phone: z.string()
    .optional()
    .refine(
      val => !val || /^[\d\s\-\(\)\+\.]+$/.test(val),
      'Please enter a valid phone number'
    ),
  
  items: z.array(z.object({
    sku: z.string().min(1),
    quantity: z.number().int().min(1).max(100),
  })).min(1, 'Please select at least one item'),
  
  notes: z.string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional(),
  
  acceptedTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms to continue' }),
  }),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
```

### Form Component

```tsx
// src/components/forms/ReservationForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reservationSchema, ReservationInput } from '@/lib/validation';

interface ReservationFormProps {
  items: { sku: string; name: string; price: number; quantity: number }[];
  total: number;
  onSuccess: (orderId: string) => void;
}

export function ReservationForm({ items, total, onSuccess }: ReservationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      items: items.map(i => ({ sku: i.sku, quantity: i.quantity })),
    },
  });

  const onSubmit = async (data: ReservationInput) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to create order');
      }

      onSuccess(result.orderId);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Order Summary */}
      <div className="bg-dark-secondary rounded-xl p-6 border border-border-subtle">
        <h3 className="font-playfair text-xl text-text-primary mb-4">
          Order Summary
        </h3>
        
        {items.map((item) => (
          <div key={item.sku} className="flex justify-between py-2 border-b border-border-subtle">
            <span className="text-text-secondary">
              {item.name} × {item.quantity}
            </span>
            <span className="font-mono text-gold-400">
              ${(item.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
        
        <div className="flex justify-between pt-4 mt-4 border-t border-border-default">
          <span className="font-semibold text-text-primary">Total</span>
          <span className="font-mono text-xl text-gold-400">
            ${total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="font-playfair text-xl text-text-primary">
          Your Information
        </h3>

        {/* Name */}
        <div>
          <label className="block text-sm text-text-secondary mb-2">
            Full Name *
          </label>
          <input
            {...register('name')}
            type="text"
            className="
              w-full px-4 py-3 rounded-lg
              bg-dark-elevated border border-border-default
              text-text-primary placeholder-text-muted
              focus:border-gold-400 focus:ring-1 focus:ring-gold-400
              transition-colors
            "
            placeholder="John Smith"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-text-secondary mb-2">
            Email Address *
          </label>
          <input
            {...register('email')}
            type="email"
            className="
              w-full px-4 py-3 rounded-lg
              bg-dark-elevated border border-border-default
              text-text-primary placeholder-text-muted
              focus:border-gold-400 focus:ring-1 focus:ring-gold-400
              transition-colors
            "
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm text-text-secondary mb-2">
            Phone Number (Optional)
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="
              w-full px-4 py-3 rounded-lg
              bg-dark-elevated border border-border-default
              text-text-primary placeholder-text-muted
              focus:border-gold-400 focus:ring-1 focus:ring-gold-400
              transition-colors
            "
            placeholder="(555) 123-4567"
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm text-text-secondary mb-2">
            Notes (Optional)
          </label>
          <textarea
            {...register('notes')}
            rows={3}
            className="
              w-full px-4 py-3 rounded-lg
              bg-dark-elevated border border-border-default
              text-text-primary placeholder-text-muted
              focus:border-gold-400 focus:ring-1 focus:ring-gold-400
              transition-colors
              resize-none
            "
            placeholder="Any special instructions or questions..."
          />
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3">
        <input
          {...register('acceptedTerms')}
          type="checkbox"
          id="terms"
          className="
            mt-1 w-5 h-5 rounded
            border-border-default bg-dark-elevated
            text-gold-400 focus:ring-gold-400
          "
        />
        <label htmlFor="terms" className="text-sm text-text-secondary">
          I understand that this is a reservation. I will receive wire transfer
          instructions after submitting, and my order will be confirmed upon
          receipt of payment within 72 hours.{' '}
          <a href="/terms" className="text-gold-400 hover:underline">
            View Terms
          </a>
        </label>
      </div>
      {errors.acceptedTerms && (
        <p className="text-red-400 text-sm">{errors.acceptedTerms.message}</p>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full py-4 rounded-lg
          bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500
          hover:from-gold-400 hover:via-gold-300 hover:to-gold-400
          text-dark-primary font-semibold text-lg
          shadow-gold hover:shadow-gold-lg
          transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {isSubmitting ? 'Processing...' : 'Complete Reservation'}
      </button>

      <p className="text-center text-text-muted text-sm">
        You won't be charged until you send the wire transfer
      </p>
    </form>
  );
}
```

---

## API Route: Create Order

```typescript
// src/app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { reservationSchema } from '@/lib/validation';
import { getProductBySku } from '@/lib/products';
import { sendOrderConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = reservationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: validationResult.error.flatten().fieldErrors,
      }, { status: 400 });
    }
    
    const data = validationResult.data;
    
    // Build order items with prices
    const orderItems = await Promise.all(
      data.items.map(async (item) => {
        const product = await getProductBySku(item.sku);
        if (!product) {
          throw new Error(`Product not found: ${item.sku}`);
        }
        if (product.status !== 'available') {
          throw new Error(`Product not available: ${product.name}`);
        }
        return {
          sku: item.sku,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          images: { thumbnail: product.images.obverse },
        };
      })
    );
    
    // Calculate total
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = 0; // Free insured shipping
    const total = subtotal + shipping;
    
    // Generate order ID
    const orderId = `ORD-${Date.now()}`;
    const paymentDeadline = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();
    
    // Create order object
    const order = {
      orderId,
      customer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
      items: orderItems,
      subtotal,
      shipping,
      total,
      status: 'pending_payment',
      createdAt: new Date().toISOString(),
      paymentDeadline,
      customerNotes: data.notes,
      wireReference: orderId,
    };
    
    // TODO: Store order in database (DynamoDB, etc.)
    // await storeOrder(order);
    
    // TODO: Mark products as reserved
    // await reserveProducts(data.items);
    
    // Send emails
    await sendOrderConfirmationEmail(order);
    await sendAdminNotificationEmail(order);
    
    // Return success
    return NextResponse.json({
      success: true,
      orderId,
      message: 'Order created successfully',
      paymentDeadline,
      total,
    });
    
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create order',
    }, { status: 500 });
  }
}
```

---

## Email Templates

### Order Confirmation (to Customer)

```typescript
// src/lib/email/templates/orderConfirmation.ts
export function getOrderConfirmationEmail(order: Order) {
  return {
    subject: `Bache & Co. Order Confirmation - ${order.orderId}`,
    text: `
Dear ${order.customer.name},

Thank you for your order! We've reserved the following item(s) for you:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORDER SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Order #: ${order.orderId}
Date: ${new Date(order.createdAt).toLocaleDateString()}

${order.items.map(item => 
  `${item.name} × ${item.quantity}    $${(item.price * item.quantity).toLocaleString()}`
).join('\n')}

─────────────────────────────────────────
Total:                    $${order.total.toLocaleString()}
─────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAYMENT INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please complete your payment within 72 hours to confirm your order.

Payment Deadline: ${new Date(order.paymentDeadline).toLocaleString()}

DOMESTIC WIRE TRANSFER:
Bank Name: [Your Bank]
Routing #: [Your Routing Number]
Account #: [Your Account Number]
Account Name: Bache & Co. / IT Pro Direct LLC
Reference: ${order.orderId}

ACH TRANSFER (2-3 business days):
Use the same routing and account numbers above.

IMPORTANT: Include "${order.orderId}" in the memo/reference field.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Once we receive your payment, we'll ship your order with full insurance 
and send you a tracking number.

Questions? Reply to this email or contact nick@itprodirect.com

Thank you for choosing Bache & Co.!

Best regards,
Nick
Bache & Co.
https://bacheco-next.vercel.app
    `,
    html: `<!-- HTML version with styling -->`,
  };
}
```

### Admin Notification (to Nick)

```typescript
// src/lib/email/templates/adminNotification.ts
export function getAdminNotificationEmail(order: Order) {
  return {
    subject: `🪙 NEW ORDER - ${order.items[0]?.name} - $${order.total.toLocaleString()}`,
    text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW ORDER RECEIVED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Order #: ${order.orderId}
Time: ${new Date(order.createdAt).toLocaleString()}

CUSTOMER:
Name: ${order.customer.name}
Email: ${order.customer.email}
Phone: ${order.customer.phone || 'Not provided'}

ITEMS:
${order.items.map(item => 
  `• ${item.name} × ${item.quantity} @ $${item.price.toLocaleString()}`
).join('\n')}

TOTAL: $${order.total.toLocaleString()}

STATUS: Awaiting Payment
DEADLINE: ${new Date(order.paymentDeadline).toLocaleString()}

${order.customerNotes ? `CUSTOMER NOTES:\n${order.customerNotes}` : ''}

ACTION NEEDED:
1. Verify coin is available in inventory
2. Monitor for incoming wire transfer
3. Update order status when payment received

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `,
  };
}
```

---

## Order Status Updates

### When Payment Received

```typescript
// Email to customer
Subject: Payment Received - Order ${orderId} Confirmed!

Dear ${name},

Great news! We've received your payment of $${total} for order ${orderId}.

Your order is now being prepared for shipment. You'll receive tracking 
information within 24-48 hours.

[Order details...]

Thank you for your business!
```

### When Shipped

```typescript
// Email to customer
Subject: Your Order Has Shipped! - ${orderId}

Dear ${name},

Your order is on its way!

Tracking Number: ${trackingNumber}
Carrier: ${carrier}
Track Your Package: ${trackingUrl}

[Order details...]

Expected delivery: ${estimatedDelivery}
```

---

## Security Considerations

### For High-Value Orders ($5,000+)

1. **Phone verification** - Call customer to confirm identity
2. **Address verification** - Ship only to verified addresses
3. **Hold for clearance** - Wait for wire to fully clear (not just pending)
4. **Signature required** - All high-value shipments require signature
5. **Photo documentation** - Photograph coins before shipping

### Fraud Prevention

- Wire transfers are non-reversible (major advantage)
- No international orders until customer history established
- Be cautious of orders with urgency/pressure
- Verify email domain matches stated company (for business buyers)

---

## Shipping Recommendations

### For High-Value Coins

| Value | Recommended Method | Insurance |
|-------|-------------------|-----------|
| < $500 | USPS Priority Mail | Included up to $50, add more |
| $500-$2,500 | USPS Priority Mail Insured | Full value |
| $2,500-$10,000 | USPS Registered Mail | Full value |
| $10,000+ | USPS Registered Mail or UPS/FedEx | Full value + signature |

### USPS Registered Mail
- Most secure USPS option
- Physical signature at every handoff
- Locked chain of custody
- Takes 7-10 days but very secure
- Maximum insurance: $50,000

### Best Practices
- Use tamper-evident packaging
- No company branding on outside (discreet)
- Double-box valuable items
- Take photos before sealing
- Keep shipping receipts

---

*This payment system prioritizes security and trust for high-value transactions.*
