import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { formatCurrency, calculateSalePrice } from "@/lib/pricing";
import { Badge } from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
  spotPrice: number;
}

export function ProductCard({ product, spotPrice }: ProductCardProps) {
  const startingPrice = calculateSalePrice(spotPrice, product, 1);
  const bulkPrice = calculateSalePrice(spotPrice, product, 20);

  return (
    <Link
      href={`/product/${product.sku}`}
      className="block rounded-lg border p-6 transition-colors hover:border-[var(--color-accent)]"
      style={{
        backgroundColor: "var(--color-card)",
        borderColor: "var(--color-line)",
      }}
    >
      {/* Product Image Placeholder */}
      <div
        className="aspect-square rounded-lg mb-4 flex items-center justify-center"
        style={{ backgroundColor: "var(--color-line)" }}
      >
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain"
          />
        ) : (
          <span style={{ color: "var(--color-muted)" }}>No Image</span>
        )}
      </div>

      {/* Badges */}
      <div className="flex gap-2 mb-3">
        {product.inStock ? (
          <Badge variant="success">In Stock</Badge>
        ) : (
          <Badge variant="error">Out of Stock</Badge>
        )}
        {product.featured && <Badge>Featured</Badge>}
      </div>

      {/* Product Name */}
      <h3
        className="font-semibold mb-2 line-clamp-2"
        style={{ color: "var(--color-text)" }}
      >
        {product.name}
      </h3>

      {/* Pricing */}
      <div className="space-y-1">
        <p className="text-lg font-bold" style={{ color: "var(--color-accent)" }}>
          {formatCurrency(startingPrice)}
          <span
            className="text-sm font-normal ml-1"
            style={{ color: "var(--color-muted)" }}
          >
            each
          </span>
        </p>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          As low as {formatCurrency(bulkPrice)} at 20+
        </p>
      </div>

      {/* View Details */}
      <div
        className="mt-4 text-sm font-medium"
        style={{ color: "var(--color-accent)" }}
      >
        View Details →
      </div>
    </Link>
  );
}
