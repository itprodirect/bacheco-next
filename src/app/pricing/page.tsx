import type { Metadata } from "next";
import Link from "next/link";
import { SpotPriceBanner } from "@/components/shared/SpotPriceBanner";
import { PremiumTierTable } from "@/components/product/PremiumTierTable";
import { formatCurrency, calculateMeltValue } from "@/lib/pricing";
import productData from "@/data/products.json";
import type { ProductCatalog } from "@/types/product";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent spot-based pricing for raw BU Morgan and Peace silver dollars. See our pricing formula and volume discounts.",
};

export default function PricingPage() {
  const catalog = productData as ProductCatalog;
  const spotPrice = catalog.spotPriceFallback;
  const product = catalog.products[0]; // Use first product for example
  const meltValue = calculateMeltValue(spotPrice, product.weightOz);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Transparent Pricing
        </h1>
        <p style={{ color: "var(--color-muted)" }}>
          Our prices are based on the current silver spot price plus a fair premium
        </p>
      </div>

      {/* Spot Price Banner */}
      <div className="mb-8">
        <SpotPriceBanner spotPrice={spotPrice} isFallback={true} />
      </div>

      {/* Pricing Formula */}
      <section
        className="rounded-lg border p-6 mb-8"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-line)",
        }}
      >
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Our Pricing Formula
        </h2>

        <div
          className="rounded-lg p-4 mb-4 font-mono text-center"
          style={{ backgroundColor: "var(--color-line)" }}
        >
          <span style={{ color: "var(--color-accent)" }}>
            (Spot Price × {product.weightOz} oz) + Premium = Sale Price
          </span>
        </div>

        <div className="space-y-4 text-sm" style={{ color: "var(--color-muted)" }}>
          <p>
            <strong style={{ color: "var(--color-text)" }}>Spot Price:</strong>{" "}
            The current market price for one troy ounce of silver. This changes
            throughout the trading day.
          </p>
          <p>
            <strong style={{ color: "var(--color-text)" }}>Silver Content:</strong>{" "}
            Morgan and Peace dollars contain {product.weightOz} troy ounces of pure
            silver (they&apos;re {(product.purity * 100).toFixed(0)}% silver, weighing
            0.8594 oz total).
          </p>
          <p>
            <strong style={{ color: "var(--color-text)" }}>Premium:</strong>{" "}
            Our markup above the melt value, which covers acquisition costs,
            grading, handling, and a small profit margin. Premiums decrease with
            larger orders.
          </p>
        </div>
      </section>

      {/* Example Calculation */}
      <section
        className="rounded-lg border p-6 mb-8"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-line)",
        }}
      >
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Example Calculation
        </h2>

        <p className="mb-4 text-sm" style={{ color: "var(--color-muted)" }}>
          At a spot price of {formatCurrency(spotPrice)}/oz:
        </p>

        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b" style={{ borderColor: "var(--color-line)" }}>
            <span style={{ color: "var(--color-muted)" }}>
              Melt Value ({formatCurrency(spotPrice)} × {product.weightOz} oz)
            </span>
            <span style={{ color: "var(--color-text)" }}>
              {formatCurrency(meltValue)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b" style={{ borderColor: "var(--color-line)" }}>
            <span style={{ color: "var(--color-muted)" }}>
              Premium (1-4 coins)
            </span>
            <span style={{ color: "var(--color-text)" }}>
              +{formatCurrency(22)}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-semibold" style={{ color: "var(--color-text)" }}>
              Sale Price
            </span>
            <span className="font-bold" style={{ color: "var(--color-accent)" }}>
              {formatCurrency(meltValue + 22)}
            </span>
          </div>
        </div>
      </section>

      {/* Premium Tiers */}
      <section className="mb-8">
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Volume Discounts
        </h2>
        <p className="mb-4 text-sm" style={{ color: "var(--color-muted)" }}>
          Order more and save. Premiums decrease with quantity:
        </p>
        <PremiumTierTable product={product} spotPrice={spotPrice} />
        <p className="mt-4 text-sm" style={{ color: "var(--color-muted)" }}>
          For orders over 100 coins, please{" "}
          <Link href="/contact" className="underline" style={{ color: "var(--color-accent)" }}>
            contact us
          </Link>{" "}
          for custom quantity pricing.
        </p>
      </section>

      {/* Payment Notice */}
      <section
        className="rounded-lg border p-6 text-center"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-accent)",
        }}
      >
        <h3
          className="font-semibold mb-2"
          style={{ color: "var(--color-accent)" }}
        >
          Price Lock Policy
        </h3>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          Your price is locked once we confirm receipt of your wire/ACH payment.
          Spot price fluctuations between reservation and payment are at your
          risk. We recommend prompt payment to avoid price changes.
        </p>
      </section>
    </div>
  );
}
