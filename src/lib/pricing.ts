import type { Product, PremiumTier } from "@/types/product";

/**
 * Get the applicable premium tier for a given quantity
 */
export function getApplicablePremium(
  product: Product,
  quantity: number
): PremiumTier {
  const tier = product.premiumTiers.find(
    (t) => quantity >= t.minQty && (t.maxQty === null || quantity <= t.maxQty)
  );
  // Fallback to the last tier if no match (shouldn't happen with proper data)
  return tier || product.premiumTiers[product.premiumTiers.length - 1];
}

/**
 * Calculate the melt value of a coin based on spot price and silver content
 */
export function calculateMeltValue(spotPrice: number, weightOz: number): number {
  return spotPrice * weightOz;
}

/**
 * Calculate the sale price per coin
 */
export function calculateSalePrice(
  spotPrice: number,
  product: Product,
  quantity: number
): number {
  const melt = calculateMeltValue(spotPrice, product.weightOz);
  const tier = getApplicablePremium(product, quantity);
  return melt + tier.premium;
}

/**
 * Calculate the total order value
 */
export function calculateOrderTotal(
  spotPrice: number,
  product: Product,
  quantity: number
): number {
  const pricePerCoin = calculateSalePrice(spotPrice, product, quantity);
  return pricePerCoin * quantity;
}

/**
 * Format a number as USD currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Format a number with 2 decimal places (for spot price display)
 */
export function formatPrice(amount: number): string {
  return amount.toFixed(2);
}

/**
 * Get all premium tiers formatted for display
 */
export function getPremiumTiersDisplay(
  product: Product,
  spotPrice: number
): Array<{
  label: string;
  premium: number;
  pricePerCoin: number;
  formattedPrice: string;
}> {
  return product.premiumTiers.map((tier) => {
    const melt = calculateMeltValue(spotPrice, product.weightOz);
    const pricePerCoin = melt + tier.premium;
    return {
      label: tier.label,
      premium: tier.premium,
      pricePerCoin,
      formattedPrice: formatCurrency(pricePerCoin),
    };
  });
}
