# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bache & Co. is a Next.js 15 e-commerce application for selling rare Morgan & Peace Silver Dollars and other collectible coins. The site features a premium UI design with gold accents, a complete coin catalog with real inventory, and a reservation/order flow with wire transfer payment.

**Stack:** Next.js 15.1.0 (App Router), React 19, TypeScript 5.7 (strict), Tailwind CSS 3.4, Zod validation, AWS SES (email)

**Status:** V2 Premium Marketplace - Frontend complete with order flow

## Commands

```bash
npm run dev      # Start dev server with Turbopack (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage with featured coins
│   ├── shop/page.tsx      # Coin catalog with filters
│   ├── coin/[sku]/        # Individual coin detail pages
│   ├── order/[orderId]/   # Order confirmation pages
│   └── api/               # API routes (orders, contact, spot-price)
├── components/
│   ├── layout/            # Header, Footer, Navigation
│   ├── ui/                # Button, Card, Badge, Input, PriceDisplay
│   ├── product/           # CoinCard, CoinGallery, CertificationBadge
│   ├── forms/             # OrderForm, ContactForm, ReservationForm
│   └── shared/            # SpotPriceBanner, TrustBadges
├── lib/                   # Utilities
│   ├── pricing.ts         # Price calculations
│   ├── validation.ts      # Zod schemas
│   ├── email.ts           # AWS SES email sending
│   └── api.ts             # API client helpers
├── types/                 # TypeScript interfaces
│   ├── coin.ts            # Coin, Certification, CoinImages, etc.
│   ├── product.ts         # Legacy Product interface (spot-based)
│   ├── order.ts           # Order types
│   └── api.ts             # API response types
├── data/
│   ├── coins.json         # Rare coin catalog (19 coins)
│   └── products.json      # Legacy spot-based products
└── context/
    └── ThemeContext.tsx   # Dark/light theme provider
```

### Key Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, featured coins, categories |
| `/shop` | Full coin catalog with category filters |
| `/coin/[sku]` | Individual coin detail with gallery and reservation form |
| `/order/[orderId]` | Order confirmation with wire instructions |
| `/api/orders` | POST - Submit reservation, sends emails |
| `/api/contact` | POST - Contact form submission |

### Key Components

**Product Components (`components/product/`):**
- `CoinCard` - Premium card with rarity badges, gold accents, hover effects
- `CoinGallery` - Multi-image viewer with hover zoom
- `CertificationBadge` - PCGS/NGC/raw badge with grade display
- `ProductCard` - Legacy card for spot-based products

**UI Components (`components/ui/`):**
- `PriceDisplay` - Handles fixed, spot-based, and "Call for Price"
- `Button`, `Card`, `Input`, `Select`, `Badge`
- `ThemeToggle` - Dark/light mode switch

**Form Components (`components/forms/`):**
- `ReservationForm` - Coin reservation with validation
- `OrderForm` - Legacy order form
- `ContactForm` - Contact form

**Shared Components (`components/shared/`):**
- `TrustBadges` - Authenticity, shipping, returns badges (3 variants)
- `SpotPriceBanner` - Current silver spot price display

### Design System

**Typography (via next/font/google):**
- `font-playfair` - Playfair Display for headlines
- `font-inter` - Inter for body text (default)
- `font-mono` - JetBrains Mono for prices and codes

**Colors (Tailwind):**
- `gold-50` through `gold-900` - Gold accent palette
- `dark-base`, `dark-primary`, `dark-secondary`, `dark-elevated` - Dark theme
- `light-*` variants for light theme

**Special Classes:**
- `bg-gold-gradient` - Premium gold gradient for CTAs
- `bg-radial-gold` - Subtle radial glow background
- `shadow-gold`, `shadow-gold-lg` - Gold glow shadows
- `text-gradient-gold` - Gold gradient text

**CSS Variables (globals.css):**
- `--color-bg`, `--color-card`, `--color-text`, `--color-muted`
- `--color-accent`, `--color-gold`, `--color-gold-light`
- `--color-line`, `--color-border`, `--color-border-gold`

### Data Models

**Coin Interface (`types/coin.ts`):**
```typescript
interface Coin {
  sku: string;
  name: string;
  shortName: string;
  year: number;
  mintMark: 'P' | 'O' | 'S' | 'CC' | 'D' | 'W';
  type: 'morgan' | 'peace' | 'walking-liberty' | 'barber' | 'capped-bust';
  grade: string;
  certification?: { service: 'PCGS' | 'NGC' | 'raw'; grade: string; certNumber?: string };
  price: number;
  priceType: 'fixed' | 'spot-based' | 'negotiable' | 'call';
  rarity: 'common' | 'better-date' | 'semi-key' | 'key-date' | 'ultra-rare';
  images: { obverse: string; reverse: string; slab?: string };
  description: string;
  highlights: string[];
  status: 'available' | 'reserved' | 'sold';
  category: string[];
}
```

**Coin Catalog (`data/coins.json`):**
- 19 real coins from inventory
- Categories: carson-city, morgan-dollars, peace-dollars, walking-liberty, barber-halves, capped-bust
- Includes 1881-CC Morgan, 1895 Morgan (King), 1921-D Zerbe Proof, etc.

### Email Integration

**AWS SES (`lib/email.ts`):**
- `sendOrderNotificationToAdmin()` - Admin alert with customer details
- `sendOrderConfirmationToCustomer()` - Customer receipt with wire instructions
- `sendContactNotification()` - Contact form to admin

**Environment Variables:**
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
SES_FROM_EMAIL=nick@itprodirect.com
ADMIN_EMAIL=nick@itprodirect.com
```

### Order Flow

1. User browses `/shop` → clicks coin → `/coin/[sku]`
2. Fills `ReservationForm` → submits to `POST /api/orders`
3. API generates order ID, sends emails (admin + customer)
4. Redirects to `/order/[orderId]` with wire instructions
5. Customer has 72 hours to complete payment
6. Admin sends bank details via email reply

### Patterns

**Path Alias:** Use `@/*` for imports (maps to `./src/*`)

**Barrel Exports:** Components use `index.ts` for clean imports:
```typescript
import { CoinCard, CoinGallery } from "@/components/product";
import { Button, PriceDisplay } from "@/components/ui";
```

**Theme-Aware Styling:** Use CSS variables for theme support:
```tsx
<div className="bg-[var(--color-card)] text-[var(--color-text)]">
```

**Form Validation:** Zod schemas in `lib/validation.ts`:
```typescript
import { orderSchema, getZodErrors } from "@/lib/validation";
const result = orderSchema.safeParse(data);
```

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_CONTACT_EMAIL=nick@itprodirect.com
NEXT_PUBLIC_SITE_URL=https://bacheco.vercel.app

# AWS SES (for email)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
SES_FROM_EMAIL=nick@itprodirect.com
ADMIN_EMAIL=nick@itprodirect.com
```

## Documentation

See `docs/` folder for detailed planning docs:
- `UPGRADE_PLAN_V2.md` - Strategic plan for V2 marketplace
- `IMPLEMENTATION_CHECKLIST_V2.md` - Detailed task checklist
- `PREMIUM_UI_DESIGN.md` - Design system specifications
- `RARE_COIN_CATALOG.md` - Product data schema and samples
- `PAYMENT_IMPLEMENTATION.md` - Wire transfer flow details

## Testing

No test framework configured yet. Recommended: Jest + React Testing Library.

## Deployment

Deployed on Vercel at: https://bacheco.vercel.app
