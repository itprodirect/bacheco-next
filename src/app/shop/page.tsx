import type { Metadata } from "next";
import { ProductCard } from "@/components/product/ProductCard";
import { SpotPriceBanner } from "@/components/shared/SpotPriceBanner";
import productData from "@/data/products.json";
import type { ProductCatalog } from "@/types/product";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse our selection of raw BU Morgan and Peace silver dollars at competitive spot-based pricing.",
};

export default function ShopPage() {
  const catalog = productData as ProductCatalog;
  const spotPrice = catalog.spotPriceFallback;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Shop Silver Dollars
        </h1>
        <p style={{ color: "var(--color-muted)" }}>
          Raw BU Morgan and Peace dollars at transparent, spot-based pricing
        </p>
      </div>

      {/* Spot Price Banner */}
      <div className="mb-8">
        <SpotPriceBanner spotPrice={spotPrice} isFallback={true} />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalog.products.map((product) => (
          <ProductCard
            key={product.sku}
            product={product}
            spotPrice={spotPrice}
          />
        ))}
      </div>

      {/* Wire Transfer Notice */}
      <div
        className="mt-12 rounded-lg p-6 border text-center"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-accent)",
        }}
      >
        <h3
          className="font-semibold mb-2"
          style={{ color: "var(--color-accent)" }}
        >
          Wire/ACH Payments Only
        </h3>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          To keep prices low and reduce fraud, we currently accept wire and ACH
          bank transfers only. Submit a reservation and we&apos;ll send payment
          instructions.
        </p>
      </div>
    </div>
  );
}
