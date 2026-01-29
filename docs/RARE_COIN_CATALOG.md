# Rare Coin Catalog

> **Version:** 2.0  
> **Last Updated:** January 29, 2026  
> **Purpose:** Product data structure and sample inventory

---

## Product Data Schema

### TypeScript Interface

```typescript
// src/types/coin.ts

export type MintMark = 'P' | 'O' | 'S' | 'CC' | 'D' | 'W';
export type CoinType = 'morgan' | 'peace' | 'trade' | 'seated-liberty' | 'other';
export type GradingService = 'PCGS' | 'NGC' | 'ANACS' | 'ICG' | 'raw';
export type Rarity = 'common' | 'better-date' | 'semi-key' | 'key-date' | 'ultra-rare';
export type CoinStatus = 'available' | 'reserved' | 'sold' | 'coming-soon';

export interface Certification {
  service: GradingService;
  grade: string;
  gradeNumeric?: number;
  certNumber?: string;
  verifyUrl?: string;
  designation?: string;  // e.g., "CAC", "Plus", "Star"
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
  variety?: string;        // e.g., "8 Tail Feathers", "VAM-4"
  mintage: number;
  
  // Grading & Certification
  grade: string;
  certification?: Certification;
  
  // Pricing
  price: number;
  priceType: 'fixed' | 'negotiable' | 'call';
  originalPrice?: number;  // For showing discounts
  
  // Categorization
  rarity: Rarity;
  featured: boolean;
  category: string[];      // e.g., ["carson-city", "key-dates"]
  
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

export interface CoinCatalog {
  coins: Coin[];
  categories: Category[];
  lastUpdated: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image?: string;
}
```

---

## Sample Product Catalog

### categories.json

```json
{
  "categories": [
    {
      "slug": "carson-city",
      "name": "Carson City Morgans",
      "description": "Coins from the legendary Carson City Mint (1878-1893). Highly prized by collectors for their Wild West heritage.",
      "image": "/images/categories/carson-city.jpg"
    },
    {
      "slug": "key-dates",
      "name": "Key Date Morgans",
      "description": "The rarest and most valuable Morgan dollars. Essential for serious collectors.",
      "image": "/images/categories/key-dates.jpg"
    },
    {
      "slug": "better-dates",
      "name": "Better Date Morgans",
      "description": "Semi-scarce dates that offer excellent value for building a quality collection.",
      "image": "/images/categories/better-dates.jpg"
    },
    {
      "slug": "peace-dollars",
      "name": "Peace Dollars",
      "description": "America's last circulating silver dollar (1921-1935). Symbol of post-WWI optimism.",
      "image": "/images/categories/peace-dollars.jpg"
    },
    {
      "slug": "common-bu",
      "name": "Common Date BU",
      "description": "Brilliant Uncirculated Morgan and Peace dollars at competitive spot-based pricing.",
      "image": "/images/categories/common-bu.jpg"
    }
  ]
}
```

### coins.json (Sample Products)

```json
{
  "coins": [
    {
      "sku": "1889-cc-ms63-pcgs",
      "name": "1889-CC Morgan Dollar PCGS MS-63",
      "shortName": "1889-CC MS-63",
      "year": 1889,
      "mintMark": "CC",
      "type": "morgan",
      "variety": null,
      "mintage": 350000,
      "grade": "MS-63",
      "certification": {
        "service": "PCGS",
        "grade": "MS-63",
        "gradeNumeric": 63,
        "certNumber": "12345678",
        "verifyUrl": "https://www.pcgs.com/cert/12345678"
      },
      "price": 24500,
      "priceType": "fixed",
      "rarity": "key-date",
      "featured": true,
      "category": ["carson-city", "key-dates"],
      "images": {
        "obverse": "/images/products/1889-cc-ms63-obverse.jpg",
        "reverse": "/images/products/1889-cc-ms63-reverse.jpg",
        "slab": "/images/products/1889-cc-ms63-slab.jpg"
      },
      "description": "The 'King of Carson City' Morgans. With only 350,000 minted and very few surviving in Mint State, the 1889-CC is the most coveted of all Carson City Morgan dollars. This example displays excellent luster and eye appeal for the grade. A true centerpiece for any serious collection.",
      "highlights": [
        "Lowest mintage Carson City Morgan",
        "Extremely rare in Mint State",
        "Strong strike and lustrous surfaces",
        "PCGS certified for authenticity"
      ],
      "provenance": "Ex. Private Midwest Collection, acquired 2019.",
      "status": "available",
      "quantity": 1,
      "dateAdded": "2026-01-29",
      "lastUpdated": "2026-01-29"
    },
    {
      "sku": "1893-cc-vf30-raw",
      "name": "1893-CC Morgan Dollar VF-30 (Raw)",
      "shortName": "1893-CC VF-30",
      "year": 1893,
      "mintMark": "CC",
      "type": "morgan",
      "variety": null,
      "mintage": 677000,
      "grade": "VF-30",
      "certification": {
        "service": "raw"
      },
      "price": 485,
      "priceType": "fixed",
      "rarity": "semi-key",
      "featured": false,
      "category": ["carson-city"],
      "images": {
        "obverse": "/images/products/1893-cc-vf30-obverse.jpg",
        "reverse": "/images/products/1893-cc-vf30-reverse.jpg"
      },
      "description": "The final year of the Carson City Mint. This circulated example shows honest wear with all major details visible. The CC mintmark is clear and bold. An affordable way to own a piece of Wild West numismatic history.",
      "highlights": [
        "Last year of Carson City production",
        "Clear CC mintmark",
        "Original surfaces, no cleaning",
        "Problem-free circulated example"
      ],
      "status": "available",
      "quantity": 1,
      "dateAdded": "2026-01-29",
      "lastUpdated": "2026-01-29"
    },
    {
      "sku": "1881-cc-ms64-gsa",
      "name": "1881-CC Morgan Dollar NGC MS-64 GSA",
      "shortName": "1881-CC MS-64 GSA",
      "year": 1881,
      "mintMark": "CC",
      "type": "morgan",
      "variety": "GSA Hoard",
      "mintage": 296000,
      "grade": "MS-64",
      "certification": {
        "service": "NGC",
        "grade": "MS-64",
        "gradeNumeric": 64,
        "certNumber": "87654321",
        "verifyUrl": "https://www.ngccoin.com/certlookup/87654321",
        "designation": "GSA"
      },
      "price": 1850,
      "priceType": "fixed",
      "rarity": "better-date",
      "featured": true,
      "category": ["carson-city"],
      "images": {
        "obverse": "/images/products/1881-cc-ms64-obverse.jpg",
        "reverse": "/images/products/1881-cc-ms64-reverse.jpg",
        "slab": "/images/products/1881-cc-ms64-gsa-holder.jpg"
      },
      "description": "From the famous GSA (General Services Administration) Treasury hoard released in the 1970s-80s. This coin spent over a century in government vaults, emerging with original luster and minimal bag marks. Includes original GSA holder documentation.",
      "highlights": [
        "GSA Treasury Hoard coin",
        "Original mint luster preserved",
        "NGC certified MS-64",
        "Low mintage year (296,000)"
      ],
      "provenance": "GSA Hoard, released 1980s.",
      "status": "available",
      "quantity": 1,
      "dateAdded": "2026-01-29",
      "lastUpdated": "2026-01-29"
    },
    {
      "sku": "1884-cc-ms63-pcgs",
      "name": "1884-CC Morgan Dollar PCGS MS-63",
      "shortName": "1884-CC MS-63",
      "year": 1884,
      "mintMark": "CC",
      "type": "morgan",
      "mintage": 1136000,
      "grade": "MS-63",
      "certification": {
        "service": "PCGS",
        "grade": "MS-63",
        "gradeNumeric": 63
      },
      "price": 295,
      "priceType": "fixed",
      "rarity": "better-date",
      "featured": false,
      "category": ["carson-city"],
      "images": {
        "obverse": "/images/products/1884-cc-ms63-obverse.jpg",
        "reverse": "/images/products/1884-cc-ms63-reverse.jpg"
      },
      "description": "A lovely example of this popular Carson City date. Bright white surfaces with excellent luster. The 1884-CC is one of the more available CC Morgan dollars due to the GSA releases, making it an excellent entry point for Carson City collectors.",
      "highlights": [
        "Popular Carson City date",
        "Bright lustrous surfaces",
        "PCGS certified",
        "Excellent entry-level CC coin"
      ],
      "status": "available",
      "quantity": 1,
      "dateAdded": "2026-01-29",
      "lastUpdated": "2026-01-29"
    },
    {
      "sku": "1878-8tf-ms62-ngc",
      "name": "1878 8 Tail Feathers Morgan Dollar NGC MS-62",
      "shortName": "1878 8TF MS-62",
      "year": 1878,
      "mintMark": "P",
      "type": "morgan",
      "variety": "8 Tail Feathers",
      "mintage": 749500,
      "grade": "MS-62",
      "certification": {
        "service": "NGC",
        "grade": "MS-62",
        "gradeNumeric": 62
      },
      "price": 425,
      "priceType": "fixed",
      "rarity": "better-date",
      "featured": true,
      "category": ["better-dates"],
      "images": {
        "obverse": "/images/products/1878-8tf-ms62-obverse.jpg",
        "reverse": "/images/products/1878-8tf-ms62-reverse.jpg"
      },
      "description": "First-year Morgan dollar with the original 8 Tail Feathers reverse design. This variety was only struck for a few weeks before the design was changed to 7 feathers, making it historically significant. A must-have for type collectors and variety enthusiasts.",
      "highlights": [
        "First year of Morgan dollar series",
        "Original 8 Tail Feathers design",
        "Only ~750,000 minted",
        "Key variety for type collectors"
      ],
      "status": "available",
      "quantity": 1,
      "dateAdded": "2026-01-29",
      "lastUpdated": "2026-01-29"
    },
    {
      "sku": "1895-o-vf35-pcgs",
      "name": "1895-O Morgan Dollar PCGS VF-35",
      "shortName": "1895-O VF-35",
      "year": 1895,
      "mintMark": "O",
      "type": "morgan",
      "mintage": 450000,
      "grade": "VF-35",
      "certification": {
        "service": "PCGS",
        "grade": "VF-35",
        "gradeNumeric": 35
      },
      "price": 725,
      "priceType": "fixed",
      "rarity": "semi-key",
      "featured": false,
      "category": ["key-dates"],
      "images": {
        "obverse": "/images/products/1895-o-vf35-obverse.jpg",
        "reverse": "/images/products/1895-o-vf35-reverse.jpg"
      },
      "description": "A scarce New Orleans Mint issue from the infamous year of 1895. With only 450,000 minted and most heavily circulated, finding problem-free examples is challenging. This coin shows honest wear with good remaining detail.",
      "highlights": [
        "Scarce 1895 New Orleans issue",
        "Low mintage: 450,000",
        "PCGS certified VF-35",
        "Original surfaces"
      ],
      "status": "available",
      "quantity": 1,
      "dateAdded": "2026-01-29",
      "lastUpdated": "2026-01-29"
    },
    {
      "sku": "1921-peace-hr-au58",
      "name": "1921 Peace Dollar High Relief AU-58",
      "shortName": "1921 Peace HR AU-58",
      "year": 1921,
      "mintMark": "P",
      "type": "peace",
      "variety": "High Relief",
      "mintage": 1006473,
      "grade": "AU-58",
      "certification": {
        "service": "raw"
      },
      "price": 385,
      "priceType": "fixed",
      "rarity": "better-date",
      "featured": true,
      "category": ["peace-dollars"],
      "images": {
        "obverse": "/images/products/1921-peace-hr-obverse.jpg",
        "reverse": "/images/products/1921-peace-hr-reverse.jpg"
      },
      "description": "The first year Peace dollar in the desirable High Relief format. Only minted for a few weeks in December 1921 before the design was modified for production efficiency. Shows just the slightest wear on the high points while retaining excellent eye appeal.",
      "highlights": [
        "First year Peace dollar",
        "Desirable High Relief variety",
        "One-year-only design",
        "Nearly uncirculated condition"
      ],
      "status": "available",
      "quantity": 1,
      "dateAdded": "2026-01-29",
      "lastUpdated": "2026-01-29"
    },
    {
      "sku": "1922-peace-bu",
      "name": "1922 Peace Dollar Brilliant Uncirculated",
      "shortName": "1922 Peace BU",
      "year": 1922,
      "mintMark": "P",
      "type": "peace",
      "mintage": 51737000,
      "grade": "BU",
      "certification": {
        "service": "raw"
      },
      "price": 0,
      "priceType": "fixed",
      "rarity": "common",
      "featured": false,
      "category": ["peace-dollars", "common-bu"],
      "images": {
        "obverse": "/images/products/peace-1922-obverse.jpg",
        "reverse": "/images/products/peace-1922-reverse.jpg"
      },
      "description": "Beautiful BU 1922 Peace Dollar, the most common date in the series. Each coin contains 0.77344 troy oz of pure silver. Price based on current silver spot plus premium. See pricing page for current rates.",
      "highlights": [
        "Brilliant Uncirculated condition",
        "Contains 0.77344 oz silver",
        "Most popular Peace dollar date",
        "Spot-based pricing"
      ],
      "status": "available",
      "quantity": 25,
      "dateAdded": "2026-01-29",
      "lastUpdated": "2026-01-29"
    },
    {
      "sku": "morgan-common-bu",
      "name": "Morgan Dollar (Common Date) Brilliant Uncirculated",
      "shortName": "Morgan BU",
      "year": 0,
      "mintMark": "P",
      "type": "morgan",
      "mintage": 0,
      "grade": "BU",
      "certification": {
        "service": "raw"
      },
      "price": 0,
      "priceType": "fixed",
      "rarity": "common",
      "featured": false,
      "category": ["common-bu"],
      "images": {
        "obverse": "/images/products/morgan-obverse.jpg",
        "reverse": "/images/products/morgan-reverse.jpg"
      },
      "description": "Raw BU Morgan Dollar, common date. Each coin contains 0.77344 troy oz of pure silver. Dates vary based on inventory - common dates only (1881-S, 1882-S, 1884-O, 1885-O, 1886, etc.). Price based on current silver spot plus premium.",
      "highlights": [
        "Brilliant Uncirculated condition",
        "Contains 0.77344 oz silver",
        "Dates vary by availability",
        "Spot-based pricing"
      ],
      "status": "available",
      "quantity": 15,
      "dateAdded": "2026-01-29",
      "lastUpdated": "2026-01-29"
    }
  ],
  "lastUpdated": "2026-01-29"
}
```

---

## Pricing Rules

### Fixed Price Items (Rare Coins)
- Price set manually based on market research
- No automatic calculation
- May include "priceType": "negotiable" for very high-value items

### Spot-Based Items (Common BU)
- Uses same formula: `(Spot × 0.77344) + Premium`
- Premium tiers based on quantity
- When `price: 0` in data, calculate dynamically

```typescript
// lib/pricing.ts
export function calculatePrice(coin: Coin, spotPrice: number, quantity: number = 1): number {
  // If fixed price, return it
  if (coin.price > 0) {
    return coin.price;
  }
  
  // Calculate spot-based price
  const SILVER_WEIGHT_OZ = 0.77344;
  const meltValue = spotPrice * SILVER_WEIGHT_OZ;
  
  // Get premium based on quantity
  const premium = getPremiumTier(quantity);
  
  return meltValue + premium;
}

function getPremiumTier(quantity: number): number {
  if (quantity >= 20) return 15;
  if (quantity >= 10) return 18;
  if (quantity >= 5) return 20;
  return 22;
}
```

---

## Image File Naming Convention

```
[year]-[mintmark]-[grade]-[view].jpg

Examples:
1889-cc-ms63-obverse.jpg
1889-cc-ms63-reverse.jpg
1889-cc-ms63-slab.jpg
1921-peace-hr-obverse.jpg
morgan-common-obverse.jpg
peace-1922-obverse.jpg
```

### Required Images Per Coin

| Coin Type | Required | Optional |
|-----------|----------|----------|
| Rare (>$500) | obverse, reverse | slab, edge, detail |
| Mid-range ($100-500) | obverse, reverse | slab |
| Common BU | obverse, reverse | - |

---

## Inventory Management

### Status Flow

```
coming-soon → available → reserved → sold
                 ↑            │
                 └────────────┘
                 (if payment fails)
```

### Updating Inventory

When an order is placed:
1. Change status to "reserved"
2. Send confirmation email
3. Start 72-hour payment timer

When payment received:
1. Change status to "sold"
2. Remove from active listings
3. Move to "sold archive" (for history)

When payment fails/expires:
1. Change status back to "available"
2. Send notification to customer
3. Re-list on site

---

## Search & Filter Implementation

### Filter Options

```typescript
interface FilterOptions {
  type?: CoinType[];           // morgan, peace
  mintMark?: MintMark[];       // P, O, S, CC
  yearRange?: [number, number]; // [1878, 1935]
  priceRange?: [number, number]; // [0, 50000]
  grade?: string[];            // MS-60, MS-63, VF-30
  certification?: GradingService[]; // PCGS, NGC, raw
  rarity?: Rarity[];           // key-date, semi-key
  status?: CoinStatus[];       // available only by default
  category?: string[];         // carson-city, key-dates
}
```

### Sort Options

```typescript
type SortOption = 
  | 'price-asc'
  | 'price-desc'
  | 'year-asc'
  | 'year-desc'
  | 'date-added'
  | 'rarity';
```

---

## Sample API Response

### GET /api/coins

```json
{
  "success": true,
  "data": {
    "coins": [...],
    "total": 45,
    "page": 1,
    "pageSize": 20,
    "filters": {
      "types": ["morgan", "peace"],
      "mintMarks": ["P", "O", "S", "CC"],
      "priceRange": [85, 24500],
      "categories": ["carson-city", "key-dates", "better-dates", "peace-dollars", "common-bu"]
    }
  }
}
```

### GET /api/coins/[sku]

```json
{
  "success": true,
  "data": {
    "sku": "1889-cc-ms63-pcgs",
    "name": "1889-CC Morgan Dollar PCGS MS-63",
    ...
    "relatedCoins": [
      { "sku": "1890-cc-ms62", "name": "1890-CC Morgan MS-62", "price": 425 },
      { "sku": "1891-cc-ms63", "name": "1891-CC Morgan MS-63", "price": 375 }
    ]
  }
}
```

---

*Update this catalog as you photograph and price your actual inventory.*
