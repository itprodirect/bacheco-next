# Bache & Co. Site Migration Plan

> **Version:** 1.0  
> **Last Updated:** January 19, 2026  
> **Contact:** nick@itprodirect.com

---

## Executive Summary

**Current State:** Static HTML/CSS/JS site with client-side header/footer injection, demo-only forms, and stub pricing data.

**Target State:** Next.js App Router on Vercel (free tier), AWS backend for forms/pricing APIs, real product data, wire/bank transfer payments only, and dark/light mode toggle.

**Timeline:** 2-3 weeks for MVP launch

---

## Key Decisions (From Planning Session)

| Decision | Choice |
|----------|--------|
| **API Gateway** | Must be created (none exists currently) |
| **Contact Email** | nick@itprodirect.com |
| **Domain** | Vercel subdomain for now (e.g., bacheco.vercel.app) |
| **Pricing Strategy** | Match market: ~$15-25 over spot for BU common date coins |
| **Payment Methods** | Wire/bank transfer ONLY until customer history established |
| **Theme** | Dark/light mode toggle (user preference) |

---

## Market Research Summary (January 2026)

### Current Silver Spot Price
- **Spot:** ~$89-94/oz (highly volatile - was $92.25 on Jan 14, 2026 ATH)
- **Formula:** (Spot × 0.77344 oz) + Premium = Sale Price

### Competitive Premium Analysis
| Dealer | Product | Premium Over Melt |
|--------|---------|-------------------|
| JM Bullion | BU Peace Dollar (1922-35) | ~$15-20 |
| SD Bullion | BU Peace Dollar | ~$15-20 |
| APMEX | 1922 Peace BU | ~$18-25 |
| Industry Avg | Common BU Morgan/Peace | $15-25 |

### Recommended Pricing Tiers

| Quantity | Premium/Coin | Notes |
|----------|--------------|-------|
| 1-4 | $22 | Single/small orders |
| 5-9 | $20 | Small bulk |
| 10-19 | $18 | Medium bulk |
| 20+ | $15 | Large orders, call for quantity pricing |

**Example at $90 spot:**
- Melt value: $90 × 0.77344 = $69.61
- Sale price (1-4 qty): $69.61 + $22 = **$91.61/coin**

---

## Phase 0: Pre-Development Setup

### 0.1 Repository Structure
```
bacheco-next/
├── .env.example          # Environment variable template
├── .env.local            # Local secrets (git-ignored)
├── docs/
│   ├── ARCHITECTURE.md   # Component tree & data flow
│   ├── AWS_INTEGRATION.md # Backend endpoint specs
│   └── DATA_MODEL.md     # Product schema
├── MIGRATION_PLAN.md     # This document
├── IMPLEMENTATION_CHECKLIST.md
└── ... (Next.js project files)
```

### 0.2 Environment Variables
```bash
# .env.example
NEXT_PUBLIC_CONTACT_EMAIL=nick@itprodirect.com

# AWS Backend (Phase 2)
AWS_API_BASE=https://your-api-id.execute-api.us-east-1.amazonaws.com/prod
AWS_REGION=us-east-1

# Spot Price (Phase 2 - if using external API)
SPOT_PRICE_API_KEY=optional
SPOT_PRICE_FALLBACK=90.00

# Vercel deployment will use these from dashboard
```

### 0.3 Git Workflow
- Main branch: `main` (production deploys)
- Development: `develop` (staging/preview)
- Feature branches: `feature/component-name`

---

## Phase 1: Next.js Foundation

### 1.1 Initialize Project
```bash
npx create-next-app@latest bacheco-next \
  --app \
  --typescript \
  --tailwind \
  --eslint \
  --src-dir \
  --import-alias "@/*"
```

### 1.2 Design System Migration

#### CSS Custom Properties → Tailwind Config
```css
/* Current (main.css) */
--bg: #0b0f17;
--card: #121a26;
--text: #e8eef7;
--muted: #93a4b8;
--line: #223049;
--accent: #d4b36a;
```

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme (default)
        dark: {
          bg: '#0b0f17',
          card: '#121a26',
          text: '#e8eef7',
          muted: '#93a4b8',
          line: '#223049',
          accent: '#d4b36a',
        },
        // Light theme
        light: {
          bg: '#f8fafc',
          card: '#ffffff',
          text: '#1e293b',
          muted: '#64748b',
          line: '#e2e8f0',
          accent: '#b8860b',
        }
      }
    }
  }
}
```

### 1.3 Theme Toggle Implementation

Create a theme context provider with localStorage persistence:

```typescript
// src/context/ThemeContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

### 1.4 Route Structure

```
src/app/
├── layout.tsx              # Root layout (Header, Footer, ThemeProvider)
├── page.tsx                # Homepage
├── globals.css             # Tailwind + custom styles
├── shop/
│   └── page.tsx            # Product listing
├── product/
│   └── [slug]/
│       └── page.tsx        # Dynamic product pages
├── order/
│   └── page.tsx            # Reservation form
├── contact/
│   └── page.tsx            # Contact form
├── pricing/
│   └── page.tsx            # Pricing table
├── about/
│   └── page.tsx            # About page
├── faq/
│   └── page.tsx            # FAQ
├── terms/
│   └── page.tsx            # Terms of service
├── privacy/
│   └── page.tsx            # Privacy policy
└── api/
    ├── orders/
    │   └── route.ts        # POST /api/orders → AWS
    ├── contact/
    │   └── route.ts        # POST /api/contact → AWS
    └── spot-price/
        └── route.ts        # GET /api/spot-price → AWS or external
```

### 1.5 Component Inventory

| Current File | Next.js Component | Priority |
|--------------|-------------------|----------|
| `partials/header.html` | `src/components/Header.tsx` | P0 |
| `partials/footer.html` | `src/components/Footer.tsx` | P0 |
| `assets/js/includes.js` | **DELETED** (layout handles) | P0 |
| N/A | `src/components/ThemeToggle.tsx` | P0 |
| `assets/js/pricing.js` | `src/lib/pricing.ts` | P1 |
| `data/products.json` | `src/data/products.json` + types | P1 |
| `assets/js/order.js` | `src/components/OrderForm.tsx` | P1 |
| N/A | `src/components/SpotPriceBanner.tsx` | P1 |
| N/A | `src/components/ProductCard.tsx` | P1 |
| N/A | `src/components/PricingTable.tsx` | P1 |

---

## Phase 2: AWS Backend Integration

### 2.1 Required AWS Services

| Service | Purpose | Estimated Cost |
|---------|---------|----------------|
| **API Gateway** | REST API endpoints | Free tier: 1M calls/month |
| **Lambda** | Order/contact handlers | Free tier: 1M requests/month |
| **SES** | Transactional email | $0.10/1000 emails |
| **DynamoDB** | Order storage (optional) | Free tier: 25GB |

### 2.2 API Endpoints

| Method | Endpoint | Purpose | Lambda Handler |
|--------|----------|---------|----------------|
| `POST` | `/orders` | Submit reservation | `orderHandler` |
| `POST` | `/contact` | Contact form | `contactHandler` |
| `GET` | `/spot-price` | Current spot + products | `spotPriceHandler` |

### 2.3 Vercel ↔ AWS Proxy Strategy

```typescript
// src/app/api/orders/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  // Validate required fields
  if (!body.name || !body.email || !body.product || !body.quantity) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }
  
  // Forward to AWS
  const response = await fetch(`${process.env.AWS_API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
```

### 2.4 Order Confirmation Flow (Wire/Bank Transfer)

Since we're accepting wire/bank transfers only:

1. User submits reservation form
2. API creates order record with status `pending_payment`
3. Confirmation page displays:
   - Order reference number
   - Wire/ACH instructions
   - Payment deadline (48-72 hours)
4. Email sent to both customer and nick@itprodirect.com
5. Manual verification before shipping

```typescript
// Order confirmation component
interface WireInstructions {
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountName: string;
  reference: string;
}

// Display after successful order submission
<OrderConfirmation 
  orderId={orderId}
  wireInstructions={wireInstructions}
/>
```

---

## Phase 3: Content & Data

### 3.1 Product Data Schema

```typescript
// src/types/product.ts
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
  weightOz: number;      // 0.77344 for Morgan/Peace
  purity: number;        // 0.90 for 90% silver
  premiumTiers: PremiumTier[];
  images: string[];
  inStock: boolean;
  featured: boolean;
}
```

### 3.2 Updated products.json

```json
{
  "products": [
    {
      "sku": "peace-1922-bu",
      "name": "1922 Peace Dollar - Brilliant Uncirculated",
      "shortName": "1922 Peace BU",
      "description": "Beautiful BU 1922 Peace Dollar, the most common date in the series. Each coin contains 0.77344 troy oz of pure silver.",
      "weightOz": 0.77344,
      "purity": 0.90,
      "premiumTiers": [
        { "minQty": 1, "maxQty": 4, "premium": 22, "label": "1-4 coins" },
        { "minQty": 5, "maxQty": 9, "premium": 20, "label": "5-9 coins" },
        { "minQty": 10, "maxQty": 19, "premium": 18, "label": "10-19 coins" },
        { "minQty": 20, "maxQty": null, "premium": 15, "label": "20+ coins" }
      ],
      "images": ["/images/products/peace-1922-obverse.jpg", "/images/products/peace-1922-reverse.jpg"],
      "inStock": true,
      "featured": true
    },
    {
      "sku": "morgan-common-bu",
      "name": "Morgan Dollar (Common Date) - Brilliant Uncirculated",
      "shortName": "Morgan BU",
      "description": "Raw BU Morgan Dollar, common date. Each coin contains 0.77344 troy oz of pure silver. Dates vary based on inventory.",
      "weightOz": 0.77344,
      "purity": 0.90,
      "premiumTiers": [
        { "minQty": 1, "maxQty": 4, "premium": 22, "label": "1-4 coins" },
        { "minQty": 5, "maxQty": 9, "premium": 20, "label": "5-9 coins" },
        { "minQty": 10, "maxQty": 19, "premium": 18, "label": "10-19 coins" },
        { "minQty": 20, "maxQty": null, "premium": 15, "label": "20+ coins" }
      ],
      "images": ["/images/products/morgan-obverse.jpg", "/images/products/morgan-reverse.jpg"],
      "inStock": true,
      "featured": true
    }
  ],
  "spotPriceFallback": 90.00,
  "lastUpdated": "2026-01-19"
}
```

### 3.3 Pricing Calculator

```typescript
// src/lib/pricing.ts
import type { Product, PremiumTier } from '@/types/product';

export function getApplicablePremium(product: Product, quantity: number): PremiumTier {
  return product.premiumTiers.find(tier => 
    quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)
  ) || product.premiumTiers[product.premiumTiers.length - 1];
}

export function calculateMeltValue(spotPrice: number, weightOz: number): number {
  return spotPrice * weightOz;
}

export function calculateSalePrice(spotPrice: number, product: Product, quantity: number): number {
  const melt = calculateMeltValue(spotPrice, product.weightOz);
  const tier = getApplicablePremium(product, quantity);
  return melt + tier.premium;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}
```

---

## Phase 4: SEO & Production Readiness

### 4.1 Metadata Strategy

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'Bache & Co. | Raw BU Morgan & Peace Silver Dollars',
    template: '%s | Bache & Co.'
  },
  description: 'Premium BU Morgan and Peace silver dollars at transparent spot-based pricing. Wire/bank transfer orders. Competitive premiums.',
  keywords: ['Morgan dollars', 'Peace dollars', 'silver coins', 'BU silver', 'bullion'],
  openGraph: {
    title: 'Bache & Co. | Silver Dollar Specialists',
    description: 'Premium BU Morgan and Peace silver dollars at transparent spot-based pricing.',
    url: 'https://bacheco.vercel.app',
    siteName: 'Bache & Co.',
    type: 'website',
  },
};
```

### 4.2 SEO Fixes Checklist

- [ ] Update `robots.txt` to allow crawling
- [ ] Generate dynamic `sitemap.xml`
- [ ] Add canonical URLs to all pages
- [ ] Add structured data (Product schema)
- [ ] Verify Open Graph tags work
- [ ] Test with Google Search Console

### 4.3 Content Updates

- [ ] Replace placeholder contact email → nick@itprodirect.com
- [ ] Update policy dates to current (January 2026)
- [ ] Remove all "v0 stub" and "coming soon" references
- [ ] Remove CloudFront/S3 references in copy
- [ ] Add real product images
- [ ] Write accurate product descriptions

---

## Phase 5: Deployment

### 5.1 Vercel Deployment

1. Push Next.js project to GitHub
2. Connect repo to Vercel (free account)
3. Configure environment variables in Vercel dashboard
4. Enable automatic deployments on push to `main`
5. Set up preview deployments for PRs

### 5.2 AWS Lambda Deployment

```bash
# Using AWS SAM or Serverless Framework
serverless deploy --stage prod
```

### 5.3 Pre-Launch QA Checklist

- [ ] All pages render without JS errors
- [ ] Theme toggle works and persists
- [ ] Forms validate correctly
- [ ] Form submissions reach AWS and trigger emails
- [ ] Pricing calculations are accurate
- [ ] Mobile responsive (test on real devices)
- [ ] Lighthouse audit: aim for 90+ performance
- [ ] Test order flow end-to-end
- [ ] Verify email notifications work

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Spot price API fails | Medium | High | Fallback to last known price |
| High silver volatility | High | Medium | Clear disclaimers, refresh pricing often |
| AWS free tier exceeded | Low | Low | Monitor usage, set billing alerts |
| Form spam | Medium | Medium | Add rate limiting, honeypot fields |
| Wire fraud attempts | Medium | High | Verify customer identity, wait for funds to clear |

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Site live on Vercel | Week 1 | Deployment successful |
| Forms submit to AWS | Week 2 | End-to-end test passes |
| First real order | Week 3 | Order received via email |
| Lighthouse Performance | 90+ | Lighthouse CI |
| Mobile usability | 100% | Google Mobile-Friendly Test |

---

## Next Steps

1. **Review this plan** and confirm all decisions
2. **Create the docs/** folder with supporting documentation
3. **Initialize Next.js project** and configure Tailwind
4. **Begin Phase 1** with layout and component migration

---

*This plan will be updated as we progress. Each phase should be committed to version control before moving to the next.*
