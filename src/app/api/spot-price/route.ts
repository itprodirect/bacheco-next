import { NextResponse } from "next/server";

// Fallback spot price - update this periodically or integrate with live API later
const SPOT_PRICE_FALLBACK = parseFloat(process.env.SPOT_PRICE_FALLBACK || "90.00");

export async function GET() {
  try {
    // TODO: Fetch live spot price from metals API
    // For now, return fallback price

    const spotPrice = SPOT_PRICE_FALLBACK;

    console.log("Spot price requested:", spotPrice);

    return NextResponse.json({
      spotPrice,
      currency: "USD",
      source: "fallback",
      timestamp: new Date().toISOString(),
      isFallback: true,
    });
  } catch (error) {
    console.error("Spot price fetch error:", error);
    return NextResponse.json(
      {
        spotPrice: SPOT_PRICE_FALLBACK,
        currency: "USD",
        source: "fallback",
        timestamp: new Date().toISOString(),
        isFallback: true,
      }
    );
  }
}
