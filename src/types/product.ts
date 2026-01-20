export interface PremiumTier {
  minQty: number;
  maxQty: number | null;
  premium: number;
  label: string;
}

export interface Product {
  sku: string;
  name: string;
  shortName: string;
  description: string;
  weightOz: number; // 0.77344 for Morgan/Peace
  purity: number; // 0.90 for 90% silver
  premiumTiers: PremiumTier[];
  images: string[];
  inStock: boolean;
  featured: boolean;
}

export interface ProductCatalog {
  products: Product[];
  spotPriceFallback: number;
  lastUpdated: string;
}
