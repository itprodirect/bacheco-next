"use client";

import { formatCurrency } from "@/lib/pricing";

interface SpotPriceBannerProps {
  spotPrice: number;
  isFallback?: boolean;
  lastUpdated?: string;
}

export function SpotPriceBanner({
  spotPrice,
  isFallback = true,
  lastUpdated,
}: SpotPriceBannerProps) {
  return (
    <div
      className="rounded-lg p-4 border text-center"
      style={{
        backgroundColor: "var(--color-card)",
        borderColor: "var(--color-line)",
      }}
    >
      <p className="text-sm mb-1" style={{ color: "var(--color-muted)" }}>
        Silver Spot Price
      </p>
      <p className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
        {formatCurrency(spotPrice)}
        <span
          className="text-sm font-normal ml-1"
          style={{ color: "var(--color-muted)" }}
        >
          /oz
        </span>
      </p>
      {isFallback && (
        <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
          Fallback price shown. Live pricing coming soon.
        </p>
      )}
      {lastUpdated && !isFallback && (
        <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
          Last updated: {lastUpdated}
        </p>
      )}
    </div>
  );
}
