import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/validation";
import { sendOrderNotificationToAdmin, sendOrderConfirmationToCustomer } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const result = orderSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Invalid order data", errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const order = result.data;

    // Generate order ID
    const orderId = `BCO-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Log order to console
    console.log("=== NEW ORDER RECEIVED ===");
    console.log("Order ID:", orderId);
    console.log("Customer:", order.name, "-", order.email);
    console.log("Phone:", order.phone || "Not provided");
    console.log("Product:", order.product);
    console.log("Quantity:", order.quantity);
    console.log("Submitted:", new Date().toISOString());
    console.log("==========================");

    // Send email notifications
    const emailData = {
      orderId,
      customerName: order.name,
      customerEmail: order.email,
      customerPhone: order.phone,
      product: order.product,
      quantity: order.quantity,
      shippingAddress: order.shippingAddress,
      notes: order.notes,
    };

    try {
      // Send both emails in parallel
      await Promise.all([
        sendOrderNotificationToAdmin(emailData),
        sendOrderConfirmationToCustomer(emailData),
      ]);
      console.log("Order emails sent successfully");
    } catch (emailError) {
      // Log email error but don't fail the order
      console.error("Failed to send order emails:", emailError);
    }

    return NextResponse.json({
      success: true,
      orderId,
      message: "Your reservation has been received! Check your email for confirmation.",
      wireInstructions: {
        bankName: "Wire instructions will be sent via email",
        reference: orderId,
      },
      orderSummary: {
        product: order.product,
        quantity: order.quantity,
        customerEmail: order.email,
      },
    });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process order. Please try again." },
      { status: 500 }
    );
  }
}
