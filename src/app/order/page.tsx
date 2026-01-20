import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderForm } from "@/components/forms/OrderForm";
import { SpotPriceBanner } from "@/components/shared/SpotPriceBanner";
import productData from "@/data/products.json";
import type { ProductCatalog } from "@/types/product";

export const metadata: Metadata = {
  title: "Place Order",
  description:
    "Submit a reservation for raw BU Morgan and Peace silver dollars. Wire/ACH payment only.",
};

// Client component wrapper to handle search params
function OrderFormWrapper() {
  const catalog = productData as ProductCatalog;
  const spotPrice = catalog.spotPriceFallback;

  return (
    <OrderForm
      products={catalog.products}
      spotPrice={spotPrice}
    />
  );
}

export default function OrderPage() {
  const catalog = productData as ProductCatalog;
  const spotPrice = catalog.spotPriceFallback;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Place Your Order
        </h1>
        <p style={{ color: "var(--color-muted)" }}>
          Submit a reservation and we&apos;ll send payment instructions
        </p>
      </div>

      {/* Spot Price Banner */}
      <div className="mb-8">
        <SpotPriceBanner spotPrice={spotPrice} isFallback={true} />
      </div>

      {/* Wire Transfer Notice */}
      <div
        className="rounded-lg border p-4 mb-8"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-accent)",
        }}
      >
        <h3
          className="font-semibold mb-2 flex items-center gap-2"
          style={{ color: "var(--color-accent)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
          Wire/ACH Payment Only
        </h3>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          After submitting this form, you&apos;ll receive an email with wire/ACH
          payment instructions. Your price is locked once we confirm payment
          receipt. Orders are typically shipped within 2-3 business days after
          payment clears.
        </p>
      </div>

      {/* Order Form */}
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-line)",
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <OrderFormWrapper />
        </Suspense>
      </div>
    </div>
  );
}
