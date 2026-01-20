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
  const command = new SendEmailCommand({
    Source: FROM_EMAIL,
    Destination: {
      ToAddresses: [ADMIN_EMAIL],
    },
    Message: {
      Subject: {
        Data: `New Order: ${data.orderId} - ${data.product} x${data.quantity}`,
      },
      Body: {
        Text: {
          Data: `
NEW ORDER RECEIVED
==================

Order ID: ${data.orderId}
Date: ${new Date().toLocaleString()}

CUSTOMER INFORMATION
--------------------
Name: ${data.customerName}
Email: ${data.customerEmail}
Phone: ${data.customerPhone || "Not provided"}

ORDER DETAILS
-------------
Product: ${data.product}
Quantity: ${data.quantity}

Shipping Address:
${data.shippingAddress || "To be confirmed"}

Notes:
${data.notes || "None"}

==================
Please send wire/ACH instructions to the customer.
          `.trim(),
        },
        Html: {
          Data: `
<!DOCTYPE html>
<html>
<head><style>body{font-family:Arial,sans-serif;color:#333;}.header{background:#0b0f17;color:#d4b36a;padding:20px;}.content{padding:20px;}.label{color:#666;font-size:12px;text-transform:uppercase;}.value{font-size:16px;margin-bottom:15px;}</style></head>
<body>
<div class="header"><h1>New Order Received</h1></div>
<div class="content">
<p class="label">Order ID</p><p class="value"><strong>${data.orderId}</strong></p>
<p class="label">Customer</p><p class="value">${data.customerName}<br>${data.customerEmail}<br>${data.customerPhone || "No phone"}</p>
<p class="label">Order</p><p class="value"><strong>${data.product}</strong> x ${data.quantity}</p>
<p class="label">Shipping Address</p><p class="value">${data.shippingAddress || "To be confirmed"}</p>
<p class="label">Notes</p><p class="value">${data.notes || "None"}</p>
<hr>
<p><em>Please send wire/ACH instructions to the customer.</em></p>
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
  const command = new SendEmailCommand({
    Source: FROM_EMAIL,
    Destination: {
      ToAddresses: [data.customerEmail],
    },
    Message: {
      Subject: {
        Data: `Order Received - ${data.orderId} | Bache & Co.`,
      },
      Body: {
        Text: {
          Data: `
Thank you for your order!

Order Reference: ${data.orderId}

We've received your reservation for:
- ${data.product} x ${data.quantity}

NEXT STEPS
----------
We'll review your order and send wire/ACH payment instructions shortly.
Please wait for our email with payment details before sending any funds.

If you have questions, reply to this email or contact us at ${ADMIN_EMAIL}.

Thank you for choosing Bache & Co.!
          `.trim(),
        },
        Html: {
          Data: `
<!DOCTYPE html>
<html>
<head><style>body{font-family:Arial,sans-serif;color:#333;}.header{background:#0b0f17;color:#d4b36a;padding:20px;text-align:center;}.content{padding:20px;max-width:600px;margin:0 auto;}.order-box{background:#f5f5f5;padding:15px;border-radius:8px;margin:20px 0;}.footer{text-align:center;color:#666;font-size:12px;padding:20px;}</style></head>
<body>
<div class="header"><h1>Order Received!</h1></div>
<div class="content">
<p>Thank you for your order with Bache & Co.</p>
<div class="order-box">
<p><strong>Order Reference:</strong> ${data.orderId}</p>
<p><strong>Product:</strong> ${data.product}</p>
<p><strong>Quantity:</strong> ${data.quantity}</p>
</div>
<h3>Next Steps</h3>
<p>We'll review your order and send wire/ACH payment instructions shortly.</p>
<p><strong>Please wait for our email with payment details before sending any funds.</strong></p>
<p>If you have questions, reply to this email or contact us at <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a>.</p>
</div>
<div class="footer"><p>Bache & Co. | Premium Silver Dollars</p></div>
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
