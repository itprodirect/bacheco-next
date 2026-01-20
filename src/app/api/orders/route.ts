import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/validation";

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

    // Generate a simple order ID
    const orderId = `BCO-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Log order to console (for testing - replace with AWS SES/DynamoDB later)
    console.log("=== NEW ORDER RECEIVED ===");
    console.log("Order ID:", orderId);
    console.log("Customer:", order.name, "-", order.email);
    console.log("Phone:", order.phone || "Not provided");
    console.log("Product:", order.product);
    console.log("Quantity:", order.quantity);
    console.log("Shipping:", order.shippingAddress || "To be confirmed");
    console.log("Notes:", order.notes || "None");
    console.log("Submitted:", new Date().toISOString());
    console.log("==========================");

    // TODO: Send email via AWS SES
    // TODO: Store in DynamoDB

    return NextResponse.json({
      success: true,
      orderId,
      message: "Your reservation has been received! Check your email for wire/ACH payment instructions.",
      wireInstructions: {
        bankName: "To be provided via email",
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
