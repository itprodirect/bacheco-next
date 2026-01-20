# Data Model Documentation

> **Version:** 1.0  
> **Last Updated:** January 19, 2026

---

## Overview

This document defines the data structures used throughout the Bache & Co. application.

---

## Product Model

### TypeScript Interface

```typescript
// src/types/product.ts

export interface PremiumTier {
  minQty: number;
  maxQty: number | null;  // null = unlimited
  premium: number;        // USD amount above melt
  label: string;          // Display label e.g., "1-4 coins"
}

export interface Product {
  sku: string;
  name: string;
  shortName: string;
  description: string;
  weightOz: number;       // Troy ounces of pure silver
  purity: number;         // Decimal (0.90 = 90% silver)
  premiumTiers: PremiumTier[];
  images: string[];       // Array of image paths
  inStock: boolean;
  featured: boolean;
  category: 'morgan' | 'peace' | 'other';
  mintYear?: string;      // Specific year or "Various"
  mintMark?: string;      // P, D, S, O, CC, or "Various"
}

export interface ProductCatalog {
  products: Product[];
  spotPriceFallback: number;
  lastUpdated: string;    // ISO date string
}
```

### JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Product Catalog",
  "type": "object",
  "required": ["products", "spotPriceFallback", "lastUpdated"],
  "properties": {
    "products": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["sku", "name", "shortName", "description", "weightOz", "purity", "premiumTiers", "images", "inStock", "featured", "category"],
        "properties": {
          "sku": { "type": "string", "pattern": "^[a-z0-9-]+$" },
          "name": { "type": "string", "minLength": 1 },
          "shortName": { "type": "string", "minLength": 1 },
          "description": { "type": "string" },
          "weightOz": { "type": "number", "minimum": 0 },
          "purity": { "type": "number", "minimum": 0, "maximum": 1 },
          "premiumTiers": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["minQty", "maxQty", "premium", "label"],
              "properties": {
                "minQty": { "type": "integer", "minimum": 1 },
                "maxQty": { "type": ["integer", "null"], "minimum": 1 },
                "premium": { "type": "number", "minimum": 0 },
                "label": { "type": "string" }
              }
            }
          },
          "images": { "type": "array", "items": { "type": "string" } },
          "inStock": { "type": "boolean" },
          "featured": { "type": "boolean" },
          "category": { "type": "string", "enum": ["morgan", "peace", "other"] },
          "mintYear": { "type": "string" },
          "mintMark": { "type": "string" }
        }
      }
    },
    "spotPriceFallback": { "type": "number", "minimum": 0 },
    "lastUpdated": { "type": "string", "format": "date" }
  }
}
```

---

## Product Catalog Data

### Initial Products (products.json)

```json
{
  "products": [
    {
      "sku": "peace-1922-bu",
      "name": "1922 Peace Dollar - Brilliant Uncirculated",
      "shortName": "1922 Peace BU",
      "description": "The 1922 Peace Dollar is the most common date in the series with over 51 million minted. This coin features Lady Liberty on the obverse and a bald eagle perched on a rock with 'PEACE' inscribed below on the reverse. Each coin contains 0.77344 troy ounces of pure silver in a 90% silver, 10% copper composition. Coins are raw (ungraded) and in Brilliant Uncirculated condition with typical bag marks.",
      "weightOz": 0.77344,
      "purity": 0.90,
      "premiumTiers": [
        { "minQty": 1, "maxQty": 4, "premium": 22, "label": "1-4 coins" },
        { "minQty": 5, "maxQty": 9, "premium": 20, "label": "5-9 coins" },
        { "minQty": 10, "maxQty": 19, "premium": 18, "label": "10-19 coins" },
        { "minQty": 20, "maxQty": null, "premium": 15, "label": "20+ coins" }
      ],
      "images": [
        "/images/products/peace-1922-obverse.jpg",
        "/images/products/peace-1922-reverse.jpg"
      ],
      "inStock": true,
      "featured": true,
      "category": "peace",
      "mintYear": "1922",
      "mintMark": "P"
    },
    {
      "sku": "morgan-common-bu",
      "name": "Morgan Dollar (Common Date) - Brilliant Uncirculated",
      "shortName": "Morgan BU",
      "description": "The Morgan Dollar, minted from 1878-1904 and again in 1921, is one of America's most beloved coins. Designed by George T. Morgan, it features Lady Liberty on the obverse and a heraldic eagle on the reverse. Each coin contains 0.77344 troy ounces of pure silver. These are raw (ungraded) BU coins with typical bag marks. Dates and mint marks vary based on current inventory - common dates only.",
      "weightOz": 0.77344,
      "purity": 0.90,
      "premiumTiers": [
        { "minQty": 1, "maxQty": 4, "premium": 22, "label": "1-4 coins" },
        { "minQty": 5, "maxQty": 9, "premium": 20, "label": "5-9 coins" },
        { "minQty": 10, "maxQty": 19, "premium": 18, "label": "10-19 coins" },
        { "minQty": 20, "maxQty": null, "premium": 15, "label": "20+ coins" }
      ],
      "images": [
        "/images/products/morgan-obverse.jpg",
        "/images/products/morgan-reverse.jpg"
      ],
      "inStock": true,
      "featured": true,
      "category": "morgan",
      "mintYear": "Various",
      "mintMark": "Various"
    }
  ],
  "spotPriceFallback": 90.00,
  "lastUpdated": "2026-01-19"
}
```

---

## Order Model

### TypeScript Interface

```typescript
// src/types/order.ts

export interface OrderRequest {
  // Customer Information
  name: string;
  email: string;
  phone?: string;
  
  // Order Details
  product: string;        // Product SKU
  quantity: number;
  
  // Optional
  notes?: string;
}

export interface OrderSummary {
  product: string;        // Product name
  productSku: string;
  quantity: number;
  spotPriceAtOrder: number;
  meltValue: number;
  premiumPerCoin: number;
  pricePerCoin: number;
  totalPrice: number;
}

export interface WireInstructions {
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountName: string;
  reference: string;      // Order ID
  paymentDeadline: string; // ISO date string
}

export interface OrderResponse {
  success: true;
  orderId: string;
  message: string;
  wireInstructions: WireInstructions;
  orderSummary: OrderSummary;
}

export interface OrderErrorResponse {
  success: false;
  error: string;
  details?: Record<string, string>;
}

// For DynamoDB storage
export interface StoredOrder extends OrderRequest, OrderSummary {
  orderId: string;
  status: 'pending_payment' | 'payment_received' | 'shipped' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  paymentReceivedAt?: string;
  shippedAt?: string;
  trackingNumber?: string;
}
```

### Order Status Flow

```
pending_payment → payment_received → shipped → completed
        ↓                ↓              ↓
    cancelled        cancelled      cancelled
```

---

## Contact Model

### TypeScript Interface

```typescript
// src/types/contact.ts

export interface ContactRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}
```

---

## Spot Price Model

### TypeScript Interface

```typescript
// src/types/api.ts

export interface SpotPriceResponse {
  spot: number;           // USD per troy ounce
  currency: 'USD';
  source: 'live' | 'cached' | 'manual' | 'fallback';
  timestamp: string;      // ISO date string
  fallback: boolean;      // True if using fallback value
}
```

---

## Pricing Calculations

### Constants

```typescript
// Morgan and Peace dollars contain the same amount of silver
const SILVER_WEIGHT_OZ = 0.77344;  // Troy ounces of pure silver
const SILVER_PURITY = 0.90;        // 90% silver content
const TOTAL_WEIGHT_OZ = 0.8594;    // Total coin weight (26.73g)
```

### Formulas

```typescript
// Melt Value = Spot Price × Silver Weight
meltValue = spotPrice * 0.77344

// Sale Price = Melt Value + Premium
salePrice = meltValue + premium

// Example at $90 spot, qty 1-4:
// meltValue = 90 × 0.77344 = $69.61
// salePrice = $69.61 + $22 = $91.61
```

### Premium Tiers

| Quantity | Premium | Rationale |
|----------|---------|-----------|
| 1-4 | $22 | Single buyers, covers handling |
| 5-9 | $20 | Small volume discount |
| 10-19 | $18 | Medium bulk |
| 20+ | $15 | Large orders, competitive rate |

These premiums are competitive with major dealers (JM Bullion, APMEX, SD Bullion) for BU common-date Morgan and Peace dollars.

---

## Validation Schemas (Zod)

```typescript
// src/lib/validation.ts
import { z } from 'zod';

export const orderSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  phone: z.string()
    .optional()
    .refine(
      val => !val || /^[\d\s\-\(\)\+]+$/.test(val),
      'Please enter a valid phone number'
    ),
  product: z.string()
    .min(1, 'Please select a product'),
  quantity: z.number()
    .int('Quantity must be a whole number')
    .min(1, 'Quantity must be at least 1')
    .max(100, 'For orders over 100 coins, please contact us directly'),
  notes: z.string()
    .max(500, 'Notes must be less than 500 characters')
    .optional(),
});

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  subject: z.string()
    .max(200, 'Subject must be less than 200 characters')
    .optional(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

export type OrderInput = z.infer<typeof orderSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
```

---

## DynamoDB Table Schema

### Orders Table

**Table Name:** `bacheco-orders`

| Attribute | Type | Key | Description |
|-----------|------|-----|-------------|
| orderId | String | Partition Key | Unique order ID (e.g., ORD-1737306000000) |
| createdAt | String | Sort Key (optional) | ISO timestamp |
| status | String | GSI | Order status |
| email | String | GSI | Customer email (for lookups) |
| name | String | - | Customer name |
| phone | String | - | Customer phone |
| product | String | - | Product SKU |
| quantity | Number | - | Quantity ordered |
| spotPriceAtOrder | Number | - | Spot price when ordered |
| pricePerCoin | Number | - | Calculated price per coin |
| totalPrice | Number | - | Total order price |
| notes | String | - | Customer notes |
| updatedAt | String | - | Last update timestamp |

**Global Secondary Indexes:**
- `status-index`: Partition key = status (for filtering by status)
- `email-index`: Partition key = email (for customer order history)

---

## API Response Standards

### Success Response

```typescript
interface SuccessResponse<T> {
  success: true;
  data?: T;
  message?: string;
}
```

### Error Response

```typescript
interface ErrorResponse {
  success: false;
  error: string;
  details?: Record<string, string>;
  code?: string;
}
```

### HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful request |
| 400 | Bad Request | Validation errors |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server-side error |

---

## Sample Data for Testing

### Test Order

```json
{
  "name": "Test Customer",
  "email": "test@example.com",
  "phone": "555-123-4567",
  "product": "peace-1922-bu",
  "quantity": 5,
  "notes": "This is a test order"
}
```

### Test Contact

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "subject": "Question about shipping",
  "message": "Do you offer insured shipping? What carriers do you use?"
}
```

### Expected Order Response

```json
{
  "success": true,
  "orderId": "ORD-1737306000000",
  "message": "Order received. Please complete payment via wire transfer.",
  "wireInstructions": {
    "bankName": "Example Bank",
    "routingNumber": "123456789",
    "accountNumber": "9876543210",
    "accountName": "Bache & Co.",
    "reference": "ORD-1737306000000",
    "paymentDeadline": "2026-01-22T00:00:00Z"
  },
  "orderSummary": {
    "product": "1922 Peace Dollar - Brilliant Uncirculated",
    "productSku": "peace-1922-bu",
    "quantity": 5,
    "spotPriceAtOrder": 90.00,
    "meltValue": 69.61,
    "premiumPerCoin": 20.00,
    "pricePerCoin": 89.61,
    "totalPrice": 448.05
  }
}
```
