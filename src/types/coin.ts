// Coin types for rare coin marketplace

export type MintMark = "P" | "O" | "S" | "CC" | "D" | "W";
export type CoinType = "morgan" | "peace" | "walking-liberty" | "barber" | "capped-bust" | "other";
export type GradingService = "PCGS" | "NGC" | "ANACS" | "ICG" | "raw";
export type Rarity = "common" | "better-date" | "semi-key" | "key-date" | "ultra-rare";
export type CoinStatus = "available" | "reserved" | "sold" | "coming-soon";
export type PriceType = "fixed" | "spot-based" | "negotiable" | "call";

export interface Certification {
  service: GradingService;
  grade: string;
  gradeNumeric?: number;
  certNumber?: string;
  verifyUrl?: string;
  designation?: string; // e.g., "CAC", "Plus", "Star", "GSA"
}

export interface CoinImages {
  obverse: string;
  reverse: string;
  edge?: string;
  slab?: string;
  detail?: string[];
  thumbnail?: string;
}

export interface Coin {
  // Identification
  sku: string;
  name: string;
  shortName: string;

  // Coin Details
  year: number;
  mintMark: MintMark;
  type: CoinType;
  variety?: string; // e.g., "8 Tail Feathers", "VAM-4", "High Relief"
  mintage?: number;
  composition?: string; // e.g., "90% Silver"
  weightOz?: number; // 0.77344 for Morgan/Peace

  // Grading & Certification
  grade: string;
  certification?: Certification;

  // Pricing
  price: number; // Fixed price, or 0 if spot-based
  priceType: PriceType;
  originalPrice?: number; // For showing discounts

  // Categorization
  rarity: Rarity;
  featured: boolean;
  category: string[]; // e.g., ["carson-city", "key-dates"]

  // Media
  images: CoinImages;

  // Content
  description: string;
  highlights: string[];
  provenance?: string;

  // Inventory
  status: CoinStatus;
  quantity: number;

  // Metadata
  dateAdded: string;
  lastUpdated: string;
}

export interface CoinCategory {
  slug: string;
  name: string;
  description: string;
  image?: string;
}

export interface CoinCatalog {
  coins: Coin[];
  categories: CoinCategory[];
  spotPriceFallback: number;
  lastUpdated: string;
}

// Helper type for filtering
export interface CoinFilters {
  type?: CoinType[];
  mintMark?: MintMark[];
  yearRange?: [number, number];
  priceRange?: [number, number];
  grade?: string[];
  certification?: GradingService[];
  rarity?: Rarity[];
  status?: CoinStatus[];
  category?: string[];
}

// Sort options
export type CoinSortOption =
  | "price-asc"
  | "price-desc"
  | "year-asc"
  | "year-desc"
  | "date-added"
  | "rarity";
