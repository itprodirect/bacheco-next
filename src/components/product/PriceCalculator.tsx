"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";
import {
  calculateSalePrice,
  calculateOrderTotal,
  formatCurrency,
  getApplicablePremium,
  calculateMeltValue,
} from "@/lib/pricing";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface PriceCalculatorProps {
  product: Product;
  spotPrice: number;
}

export function PriceCalculator({ product, spotPrice }: PriceCalculatorProps) {
  const [quantity, setQuantity] = useState(1);

  const pricePerCoin = calculateSalePrice(spotPrice, product, quantity);
  const total = calculateOrderTotal(spotPrice, product, quantity);
  const tier = getApplicablePremium(product, quantity);
  const meltValue = calculateMeltValue(spotPrice, product.weightOz);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity(1);
    }
  };

  return (
    <div
      className="rounded-lg border p-6"
      style={{
        backgroundColor: "var(--color-card)",
        borderColor: "var(--color-line)",
      }}
    >
      <h3
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--color-text)" }}
      >
        Calculate Your Price
      </h3>

      {/* Quantity Input */}
      <div className="mb-6">
        <Input
          type="number"
          label="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
          min={1}
          max={100}
        />
        <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
          For orders over 100, please contact us for quantity pricing.
        </p>
      </div>

      {/* Price Breakdown */}
      <div
        className="space-y-3 mb-6 pb-6 border-b"
        style={{ borderColor: "var(--color-line)" }}
      >
        <div className="flex justify-between text-sm">
          <span style={{ color: "var(--color-muted)" }}>Melt Value</span>
          <span style={{ color: "var(--color-text)" }}>
            {formatCurrency(meltValue)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: "var(--color-muted)" }}>
            Premium ({tier.label})
          </span>
          <span style={{ color: "var(--color-text)" }}>
            +{formatCurrency(tier.premium)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: "var(--color-muted)" }}>Price per Coin</span>
          <span
            className="font-semibold"
            style={{ color: "var(--color-accent)" }}
          >
            {formatCurrency(pricePerCoin)}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-semibold" style={{ color: "var(--color-text)" }}>
          Total ({quantity} {quantity === 1 ? "coin" : "coins"})
        </span>
        <span
          className="text-2xl font-bold"
          style={{ color: "var(--color-accent)" }}
        >
          {formatCurrency(total)}
        </span>
      </div>

      {/* Reserve Button */}
      <Link href={`/order?product=${product.sku}&quantity=${quantity}`}>
        <Button className="w-full" size="lg" disabled={!product.inStock}>
          {product.inStock ? "Reserve Now" : "Out of Stock"}
        </Button>
      </Link>

      <p
        className="text-xs text-center mt-3"
        style={{ color: "var(--color-muted)" }}
      >
        Wire/ACH payment only. Price locked at time of payment confirmation.
      </p>
    </div>
  );
}
