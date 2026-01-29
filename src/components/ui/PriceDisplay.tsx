"use client";

interface PriceDisplayProps {
  price: number;
  priceType: "fixed" | "spot-based" | "negotiable" | "call";
  originalPrice?: number;
  size?: "sm" | "md" | "lg" | "xl";
  showCurrency?: boolean;
  spotPrice?: number;
  weightOz?: number;
}

const sizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

export function PriceDisplay({
  price,
  priceType,
  originalPrice,
  size = "lg",
  showCurrency = true,
  spotPrice,
  weightOz = 0.77344,
}: PriceDisplayProps) {
  // Calculate spot-based price if needed
  const displayPrice =
    priceType === "spot-based" && spotPrice
      ? spotPrice * weightOz + 22 // Default premium
      : price;

  // Handle "Call for Price" type
  if (priceType === "call" || (priceType === "fixed" && price === 0)) {
    return (
      <div className="flex flex-col">
        <span className={`font-mono font-bold text-gold-400 ${sizes[size]}`}>
          Call for Price
        </span>
        <span className="text-sm text-[var(--color-muted)]">
          Contact us for details
        </span>
      </div>
    );
  }

  // Format price based on amount
  const formatPrice = (amount: number): string => {
    if (amount >= 1000) {
      return amount.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="flex items-baseline gap-3">
      <span className={`font-mono font-bold text-gold-400 ${sizes[size]}`}>
        {showCurrency && "$"}
        {formatPrice(displayPrice)}
      </span>

      {originalPrice && originalPrice > displayPrice && (
        <span className="text-[var(--color-muted)] line-through text-sm">
          ${formatPrice(originalPrice)}
        </span>
      )}

      {priceType === "negotiable" && (
        <span className="text-xs text-gold-500 uppercase tracking-wide">
          Negotiable
        </span>
      )}

      {priceType === "spot-based" && (
        <span className="text-xs text-[var(--color-muted)]">+ spot</span>
      )}
    </div>
  );
}
