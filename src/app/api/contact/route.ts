import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Invalid contact data", errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const contact = result.data;

    // Log contact to console (for testing - replace with AWS SES later)
    console.log("=== NEW CONTACT MESSAGE ===");
    console.log("From:", contact.name, "-", contact.email);
    console.log("Subject:", contact.subject);
    console.log("Message:", contact.message);
    console.log("Received:", new Date().toISOString());
    console.log("===========================");

    // TODO: Send email via AWS SES to nick@itprodirect.com

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
