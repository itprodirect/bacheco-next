import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const FROM_EMAIL = process.env.SES_FROM_EMAIL || "nick@itprodirect.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "nick@itprodirect.com";

interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  product: string;
  quantity: number;
  shippingAddress?: string;
  notes?: string;
  coinSku?: string;
  coinPrice?: number;
  coinPriceType?: string;
}

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Send order notification to admin
 */
export async function sendOrderNotificationToAdmin(data: OrderEmailData): Promise<void> {
  // Format price
  const priceDisplay = data.coinPrice && data.coinPrice > 0
    ? `$${data.coinPrice.toLocaleString()}`
    : data.coinPriceType === "call"
      ? "CALL FOR PRICE"
      : "Spot-based pricing";

  const command = new SendEmailCommand({
    Source: FROM_EMAIL,
    Destination: {
      ToAddresses: [ADMIN_EMAIL],
    },
    ReplyToAddresses: [data.customerEmail],
    Message: {
      Subject: {
        Data: `NEW ORDER: ${data.orderId} - ${priceDisplay} - ${data.product}`,
      },
      Body: {
        Text: {
          Data: `
NEW ORDER RECEIVED
==================

Order ID: ${data.orderId}
Date: ${new Date().toLocaleString()}
SKU: ${data.coinSku || "N/A"}

CUSTOMER INFORMATION
--------------------
Name: ${data.customerName}
Email: ${data.customerEmail}
Phone: ${data.customerPhone || "Not provided"}

ORDER DETAILS
-------------
Product: ${data.product}
Price: ${priceDisplay}
Quantity: ${data.quantity}

Shipping Address:
${data.shippingAddress || "To be confirmed"}

Customer Notes:
${data.notes || "None"}

==================
ACTION REQUIRED:
1. Reply to this email with wire transfer details
2. Mark coin as "reserved" in inventory
3. Monitor for payment within 72 hours

Reply directly to respond to customer.
          `.trim(),
        },
        Html: {
          Data: `
<!DOCTYPE html>
<html>
<head>
<style>
body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; }
.header { background: linear-gradient(135deg, #0a0d12 0%, #1a202c 100%); color: #d4af37; padding: 20px; }
.header h1 { margin: 0; }
.content { padding: 20px; }
.label { color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
.value { font-size: 16px; margin-bottom: 20px; }
.price { font-size: 24px; color: #d4af37; font-weight: bold; font-family: monospace; }
.action-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
.customer-box { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0; }
</style>
</head>
<body>
<div class="header">
<h1>New Order Received</h1>
</div>
<div class="content">
<p class="label">Order Reference</p>
<p class="value"><strong style="font-family: monospace; font-size: 18px;">${data.orderId}</strong></p>

<p class="label">Item</p>
<p class="value"><strong>${data.product}</strong></p>
${data.coinSku ? `<p style="color: #666; font-size: 12px;">SKU: ${data.coinSku}</p>` : ""}

<p class="label">Price</p>
<p class="price">${priceDisplay}</p>

<div class="customer-box">
<p class="label">Customer</p>
<p style="margin: 5px 0;"><strong>${data.customerName}</strong></p>
<p style="margin: 5px 0;"><a href="mailto:${data.customerEmail}">${data.customerEmail}</a></p>
<p style="margin: 5px 0;">${data.customerPhone || "No phone provided"}</p>
</div>

${data.notes ? `<p class="label">Customer Notes</p><p class="value" style="background: #f9fafb; padding: 10px; border-radius: 4px;">${data.notes}</p>` : ""}

<div class="action-box">
<strong>Action Required:</strong>
<ol style="margin: 10px 0; padding-left: 20px;">
<li>Reply with wire transfer details</li>
<li>Mark coin as "reserved" in inventory</li>
<li>Monitor for payment (72hr deadline)</li>
</ol>
</div>

<p><em>Reply directly to this email to respond to the customer.</em></p>
</div>
</body>
</html>
          `.trim(),
        },
      },
    },
  });

  await ses.send(command);
}

/**
 * Send order confirmation to customer
 */
export async function sendOrderConfirmationToCustomer(data: OrderEmailData): Promise<void> {
  // Calculate deadline (72 hours from now)
  const deadline = new Date();
  deadline.setHours(deadline.getHours() + 72);
  const deadlineStr = deadline.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });

  // Format price
  const priceDisplay = data.coinPrice && data.coinPrice > 0
    ? `$${data.coinPrice.toLocaleString()}`
    : data.coinPriceType === "call"
      ? "Call for Price - We will contact you"
      : "Based on current spot price + premium";

  const command = new SendEmailCommand({
    Source: FROM_EMAIL,
    Destination: {
      ToAddresses: [data.customerEmail],
    },
    Message: {
      Subject: {
        Data: `Order Confirmed - ${data.orderId} | Bache & Co.`,
      },
      Body: {
        Text: {
          Data: `
BACHE & CO. - ORDER CONFIRMATION
================================

Thank you for your reservation, ${data.customerName}!

ORDER DETAILS
-------------
Order Reference: ${data.orderId}
Item: ${data.product}
Price: ${priceDisplay}

PAYMENT INSTRUCTIONS
--------------------
To complete your purchase, please send payment via wire transfer:

Bank Name: [Contact us for bank details]
Account Name: Bache & Co. / IT Pro Direct LLC
Reference/Memo: ${data.orderId}

IMPORTANT: Include your order reference (${data.orderId}) in the wire memo.

PAYMENT DEADLINE
----------------
${deadlineStr}

Your coin is reserved for 72 hours. If payment is not received by this time,
the reservation will be released.

WHAT HAPPENS NEXT
-----------------
1. Send your wire transfer with the order reference in the memo
2. Reply to this email once payment is sent
3. We'll confirm receipt and ship your coin within 48 hours
4. All shipments are fully insured via USPS Registered Mail

QUESTIONS?
----------
Reply to this email or contact us at ${ADMIN_EMAIL}

Thank you for choosing Bache & Co.!

---
Bache & Co. | Rare Morgan & Peace Dollars
Tampa Bay, Florida
          `.trim(),
        },
        Html: {
          Data: `
<!DOCTYPE html>
<html>
<head>
<style>
body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; margin: 0; padding: 0; background: #f5f5f4; }
.wrapper { max-width: 600px; margin: 0 auto; }
.header { background: linear-gradient(135deg, #0a0d12 0%, #1a202c 100%); color: #d4af37; padding: 30px 20px; text-align: center; }
.header h1 { margin: 0; font-size: 28px; font-weight: 600; }
.header p { margin: 10px 0 0; color: #9ca3af; font-size: 14px; }
.content { background: #ffffff; padding: 30px; }
.order-box { background: #f8f9fa; border-left: 4px solid #d4af37; padding: 20px; margin: 20px 0; }
.order-box h3 { margin: 0 0 15px; color: #1a1a1a; font-size: 16px; }
.order-box p { margin: 8px 0; color: #4a5568; }
.order-box .ref { font-family: monospace; font-size: 18px; color: #d4af37; font-weight: bold; }
.wire-box { background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 20px; margin: 20px 0; }
.wire-box h3 { color: #92400e; margin: 0 0 15px; }
.deadline-box { background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 15px; margin: 20px 0; }
.deadline-box strong { color: #991b1b; }
.steps { margin: 20px 0; }
.steps li { margin: 10px 0; padding-left: 10px; color: #4a5568; }
.footer { background: #0a0d12; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px; }
.footer a { color: #d4af37; text-decoration: none; }
.gold { color: #d4af37; }
</style>
</head>
<body>
<div class="wrapper">
<div class="header">
<h1>Order Confirmed!</h1>
<p>Thank you for your reservation, ${data.customerName}</p>
</div>
<div class="content">
<div class="order-box">
<h3>Order Details</h3>
<p><strong>Reference:</strong> <span class="ref">${data.orderId}</span></p>
<p><strong>Item:</strong> ${data.product}</p>
<p><strong>Price:</strong> <span class="gold">${priceDisplay}</span></p>
</div>

<div class="wire-box">
<h3>Payment Instructions</h3>
<p>To complete your purchase, send payment via wire transfer:</p>
<p><strong>Account Name:</strong> Bache & Co. / IT Pro Direct LLC</p>
<p><strong>Reference/Memo:</strong> <span class="gold">${data.orderId}</span></p>
<p><em>Reply to this email for complete bank details.</em></p>
</div>

<div class="deadline-box">
<strong>Payment Deadline:</strong> ${deadlineStr}<br>
<small>Your coin is reserved for 72 hours pending payment.</small>
</div>

<h3>What Happens Next</h3>
<ol class="steps">
<li>Send your wire transfer with the order reference in the memo</li>
<li>Reply to this email once payment is sent</li>
<li>We'll confirm receipt and ship within 48 hours</li>
<li>All shipments are fully insured</li>
</ol>

<p>Questions? Reply to this email or contact us at <a href="mailto:${ADMIN_EMAIL}" class="gold">${ADMIN_EMAIL}</a></p>
</div>
<div class="footer">
<p><strong>Bache & Co.</strong> | Rare Morgan & Peace Dollars</p>
<p>Tampa Bay, Florida</p>
<p><a href="https://bacheco.vercel.app">bacheco.vercel.app</a></p>
</div>
</div>
</body>
</html>
          `.trim(),
        },
      },
    },
  });

  await ses.send(command);
}

/**
 * Send contact form notification to admin
 */
export async function sendContactNotification(data: ContactEmailData): Promise<void> {
  const command = new SendEmailCommand({
    Source: FROM_EMAIL,
    Destination: {
      ToAddresses: [ADMIN_EMAIL],
    },
    ReplyToAddresses: [data.email],
    Message: {
      Subject: {
        Data: `Contact Form: ${data.subject}`,
      },
      Body: {
        Text: {
          Data: `
NEW CONTACT MESSAGE
===================

From: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

===================
Reply directly to this email to respond to the customer.
          `.trim(),
        },
        Html: {
          Data: `
<!DOCTYPE html>
<html>
<head><style>body{font-family:Arial,sans-serif;color:#333;}.header{background:#0b0f17;color:#d4b36a;padding:20px;}.content{padding:20px;}.message-box{background:#f5f5f5;padding:15px;border-radius:8px;margin:15px 0;}</style></head>
<body>
<div class="header"><h1>New Contact Message</h1></div>
<div class="content">
<p><strong>From:</strong> ${data.name} &lt;${data.email}&gt;</p>
<p><strong>Subject:</strong> ${data.subject}</p>
<div class="message-box"><p>${data.message.replace(/\n/g, "<br>")}</p></div>
<p><em>Reply directly to this email to respond to the customer.</em></p>
</div>
</body>
</html>
          `.trim(),
        },
      },
    },
  });

  await ses.send(command);
}
