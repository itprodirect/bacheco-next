# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bache & Co. is a Next.js 15 e-commerce application for selling raw BU Morgan & Peace Silver Dollars. Currently in Phase 1 (Frontend MVP complete), with Phase 2 AWS backend integration pending.

**Stack:** Next.js 15.1.0 (App Router), React 19, TypeScript 5.7 (strict), Tailwind CSS 3.4, Zod validation

## Commands

```bash
npm run dev      # Start dev server with Turbopack (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Directory Structure

- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - React components organized by domain (layout/, ui/, product/, forms/, shared/)
- `src/lib/` - Core utilities (api.ts, validation.ts, pricing.ts)
- `src/types/` - TypeScript interfaces (product.ts, order.ts, api.ts)
- `src/context/` - React Context providers (ThemeContext.tsx)
- `docs/` - Architecture documentation (ARCHITECTURE.md, DATA_MODEL.md, etc.)

### Key Patterns

**Path Alias:** Use `@/*` for imports (maps to `./src/*`)

**Theme System:** Context-based dark/light mode in `ThemeContext.tsx`. Uses CSS custom properties (`--color-*`) defined in `globals.css`. Components should use `var(--color-*)` for theme-aware colors.

**Form Validation:** Zod schemas in `lib/validation.ts` with `getZodErrors()` helper for extracting form errors. See `OrderForm.tsx` as reference implementation.

**Pricing Logic:** Pure functions in `lib/pricing.ts`:
- `calculateMeltValue(spotPrice, weightOz)` - Silver content value
- `calculateSalePrice(spotPrice, weightOz, quantity)` - Price with premium tier
- `calculateOrderTotal(spotPrice, weightOz, quantity)` - Full order calculation
- Premium tiers: $22 (1-4), $20 (5-9), $18 (10-19), $15 (20+)

**API Client:** All API calls centralized in `lib/api.ts` with type-safe request/response handling.

**Barrel Exports:** Components use `index.ts` files for clean imports (e.g., `import { Button } from "@/components/ui"`)

### API Routes (Pending Implementation)

- `POST /api/orders` - Submit order reservation
- `POST /api/contact` - Submit contact form
- `GET /api/spot-price` - Fetch current silver spot price

## Environment Variables

Copy `.env.example` to `.env.local`:
- `NEXT_PUBLIC_CONTACT_EMAIL` - Contact email
- `NEXT_PUBLIC_SITE_URL` - Site URL
- `AWS_API_BASE` - Backend API base URL (Phase 2)
- `SPOT_PRICE_FALLBACK` - Default spot price when API unavailable

## Testing

No test framework configured yet. Recommended: Jest + React Testing Library.
