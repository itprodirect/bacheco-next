# Bache & Co. Implementation Checklist

> **Version:** 1.0  
> **Last Updated:** January 19, 2026  
> **For Use With:** Claude Code

---

## How to Use This Checklist

This document provides a sequential task list for Claude Code to execute. Each task includes:
- **Context:** Why we're doing this
- **Command/Action:** What to do
- **Verification:** How to confirm success

Work through tasks in order. Check off each item as completed.

---

## Phase 0: Setup & Documentation

### 0.1 Documentation
- [ ] **Create project folder structure**
  ```bash
  mkdir -p bacheco-next/docs
  ```
- [ ] **Copy MIGRATION_PLAN.md to repo root**
- [ ] **Copy ARCHITECTURE.md to docs/**
- [ ] **Copy this checklist to repo root as IMPLEMENTATION_CHECKLIST.md**

### 0.2 Environment Setup
- [ ] **Create .env.example**
  ```bash
  # .env.example
  NEXT_PUBLIC_CONTACT_EMAIL=nick@itprodirect.com
  NEXT_PUBLIC_SITE_URL=https://bacheco.vercel.app
  AWS_API_BASE=
  SPOT_PRICE_FALLBACK=90.00
  ```
- [ ] **Create .gitignore entries**
  - `.env.local`
  - `.env.production.local`
  - `node_modules/`

---

## Phase 1: Next.js Foundation

### 1.1 Initialize Project
- [ ] **Create Next.js app**
  ```bash
  npx create-next-app@latest bacheco-next \
    --app \
    --typescript \
    --tailwind \
    --eslint \
    --src-dir \
    --import-alias "@/*"
  ```
- [ ] **Verify project runs**
  ```bash
  cd bacheco-next && npm run dev
  ```
  - Expected: App runs on localhost:3000

### 1.2 Configure Tailwind
- [ ] **Update tailwind.config.ts with design system colors**
  ```typescript
  // Add dark/light theme colors
  colors: {
    dark: {
      bg: '#0b0f17',
      card: '#121a26',
      text: '#e8eef7',
      muted: '#93a4b8',
      line: '#223049',
      accent: '#d4b36a',
    },
    light: {
      bg: '#f8fafc',
      card: '#ffffff',
      text: '#1e293b',
      muted: '#64748b',
      line: '#e2e8f0',
      accent: '#b8860b',
    }
  }
  ```
- [ ] **Enable darkMode: 'class' in Tailwind config**

### 1.3 Create Theme System
- [ ] **Create ThemeContext**
  - File: `src/context/ThemeContext.tsx`
  - Features: dark/light toggle, localStorage persistence
- [ ] **Create ThemeToggle component**
  - File: `src/components/ui/ThemeToggle.tsx`
  - Features: Sun/moon icon, accessible button
- [ ] **Wrap app in ThemeProvider**
  - Update: `src/app/layout.tsx`

### 1.4 Create Core Layout Components
- [ ] **Create Header component**
  - File: `src/components/layout/Header.tsx`
  - Features: Logo, navigation links, theme toggle
  - Mobile: Hamburger menu
- [ ] **Create Footer component**
  - File: `src/components/layout/Footer.tsx`
  - Features: Contact info (nick@itprodirect.com), legal links, copyright
- [ ] **Create Navigation component**
  - File: `src/components/layout/Navigation.tsx`
  - Links: Home, Shop, Pricing, About, Contact
- [ ] **Create MobileMenu component**
  - File: `src/components/layout/MobileMenu.tsx`
  - Features: Slide-out menu, close on navigation

### 1.5 Update Root Layout
- [ ] **Configure layout.tsx**
  - Import global styles
  - Add ThemeProvider
  - Add Header and Footer
  - Configure metadata
  ```typescript
  export const metadata: Metadata = {
    title: {
      default: 'Bache & Co. | Raw BU Morgan & Peace Silver Dollars',
      template: '%s | Bache & Co.'
    },
    description: 'Premium BU Morgan and Peace silver dollars at transparent spot-based pricing.',
  }
  ```

### 1.6 Create UI Components
- [ ] **Button component** - `src/components/ui/Button.tsx`
  - Variants: primary, secondary, outline
  - Sizes: sm, md, lg
- [ ] **Card component** - `src/components/ui/Card.tsx`
  - Themed for dark/light
- [ ] **Input component** - `src/components/ui/Input.tsx`
  - Error state styling
- [ ] **Select component** - `src/components/ui/Select.tsx`
- [ ] **Badge component** - `src/components/ui/Badge.tsx`
  - For "In Stock", "Featured" labels

---

## Phase 2: Data Layer

### 2.1 Type Definitions
- [ ] **Create product types**
  - File: `src/types/product.ts`
  - Interfaces: Product, PremiumTier
- [ ] **Create order types**
  - File: `src/types/order.ts`
  - Interfaces: OrderRequest, OrderResponse, WireInstructions
- [ ] **Create API types**
  - File: `src/types/api.ts`
  - Interfaces: SpotPriceResponse, ErrorResponse

### 2.2 Product Data
- [ ] **Create products.json**
  - File: `src/data/products.json`
  - Products: 1922 Peace BU, Morgan Common BU
  - Premium tiers: 1-4, 5-9, 10-19, 20+
  - Fallback spot: $90.00

### 2.3 Pricing Logic
- [ ] **Create pricing utilities**
  - File: `src/lib/pricing.ts`
  - Functions:
    - `getApplicablePremium(product, quantity)`
    - `calculateMeltValue(spot, weight)`
    - `calculateSalePrice(spot, product, quantity)`
    - `formatCurrency(amount)`
- [ ] **Add tests for pricing calculations** (optional but recommended)

### 2.4 API Client
- [ ] **Create API utilities**
  - File: `src/lib/api.ts`
  - Functions:
    - `submitOrder(data)`
    - `submitContact(data)`
    - `fetchSpotPrice()`

### 2.5 Validation
- [ ] **Install Zod**
  ```bash
  npm install zod
  ```
- [ ] **Create validation schemas**
  - File: `src/lib/validation.ts`
  - Schemas: orderSchema, contactSchema

---

## Phase 3: Pages

### 3.1 Homepage
- [ ] **Create homepage**
  - File: `src/app/page.tsx`
  - Sections:
    - Hero banner with value proposition
    - Spot price banner
    - Featured products (2 cards)
    - How it works (3 steps)
    - Wire transfer notice

### 3.2 Shop Page
- [ ] **Create ProductCard component**
  - File: `src/components/product/ProductCard.tsx`
  - Features: Image, name, starting price, "View Details" link
- [ ] **Create shop page**
  - File: `src/app/shop/page.tsx`
  - Features: Product grid, spot price banner

### 3.3 Product Detail Pages
- [ ] **Create ProductGallery component**
  - File: `src/components/product/ProductGallery.tsx`
- [ ] **Create PriceCalculator component**
  - File: `src/components/product/PriceCalculator.tsx`
  - Features: Quantity input, live price calculation
- [ ] **Create PremiumTierTable component**
  - File: `src/components/product/PremiumTierTable.tsx`
- [ ] **Create dynamic product page**
  - File: `src/app/product/[slug]/page.tsx`
  - Features: generateStaticParams for known slugs

### 3.4 Pricing Page
- [ ] **Create pricing page**
  - File: `src/app/pricing/page.tsx`
  - Features: Pricing formula explanation, tier table

### 3.5 Order Page
- [ ] **Create OrderForm component**
  - File: `src/components/forms/OrderForm.tsx`
  - Fields: name, email, phone, product, quantity, notes
  - Features: Client-side validation, loading state
- [ ] **Create order page**
  - File: `src/app/order/page.tsx`
  - Features: Form, price summary, wire transfer notice

### 3.6 Contact Page
- [ ] **Create ContactForm component**
  - File: `src/components/forms/ContactForm.tsx`
  - Fields: name, email, subject, message
- [ ] **Create contact page**
  - File: `src/app/contact/page.tsx`
  - Features: Form, contact email display

### 3.7 Static Pages
- [ ] **Create about page** - `src/app/about/page.tsx`
- [ ] **Create FAQ page** - `src/app/faq/page.tsx`
- [ ] **Create terms page** - `src/app/terms/page.tsx`
- [ ] **Create privacy page** - `src/app/privacy/page.tsx`

---

## Phase 4: API Routes

### 4.1 Create API Route Structure
- [ ] **Create orders API route**
  - File: `src/app/api/orders/route.ts`
  - Method: POST
  - Logic: Validate → Forward to AWS (when ready) → Return response
- [ ] **Create contact API route**
  - File: `src/app/api/contact/route.ts`
  - Method: POST
- [ ] **Create spot-price API route**
  - File: `src/app/api/spot-price/route.ts`
  - Method: GET
  - Logic: Return fallback price for now

### 4.2 Form Integration
- [ ] **Connect OrderForm to API**
  - POST to /api/orders
  - Handle success → Show confirmation
  - Handle error → Show error message
- [ ] **Connect ContactForm to API**
  - POST to /api/contact
  - Handle success/error states

---

## Phase 5: Shared Components

### 5.1 Spot Price Banner
- [ ] **Create SpotPriceBanner component**
  - File: `src/components/shared/SpotPriceBanner.tsx`
  - Features: Display current spot, "Last updated" time, refresh button
  - Fallback: Show stub message until live feed implemented

### 5.2 Error Handling
- [ ] **Create ErrorBoundary component**
  - File: `src/components/shared/ErrorBoundary.tsx`
- [ ] **Create LoadingSpinner component**
  - File: `src/components/shared/LoadingSpinner.tsx`

### 5.3 Order Confirmation
- [ ] **Create OrderConfirmation component**
  - File: `src/components/forms/OrderConfirmation.tsx`
  - Features: Order ID, wire instructions, payment deadline

---

## Phase 6: SEO & Polish

### 6.1 SEO Setup
- [ ] **Add page-level metadata to all pages**
- [ ] **Create robots.txt**
  - File: `public/robots.txt`
  - Content: Allow all (for production)
- [ ] **Create sitemap.xml or use next-sitemap**
- [ ] **Add Open Graph images** (optional)

### 6.2 Images
- [ ] **Create image placeholders**
  - Location: `public/images/products/`
  - Files: morgan-obverse.jpg, morgan-reverse.jpg, peace-1922-obverse.jpg, peace-1922-reverse.jpg
  - Note: Replace with real photos before launch
- [ ] **Add Next.js Image optimization**
  - Use `<Image>` component for all product images

### 6.3 Accessibility
- [ ] **Audit with axe DevTools**
- [ ] **Fix any WCAG violations**
- [ ] **Verify keyboard navigation**
- [ ] **Test with screen reader** (optional)

### 6.4 Performance
- [ ] **Run Lighthouse audit**
- [ ] **Fix any performance issues**
- [ ] **Target: 90+ score**

---

## Phase 7: AWS Backend (Deferred)

> **Note:** These tasks create the AWS infrastructure. For MVP, the API routes can return mock responses.

### 7.1 AWS Setup
- [ ] **Create AWS account or use existing**
- [ ] **Install AWS CLI and configure**
- [ ] **Create IAM user for deployment**

### 7.2 API Gateway
- [ ] **Create REST API**
  - Name: bacheco-api
  - Endpoints: /orders, /contact, /spot-price
- [ ] **Configure CORS for Vercel domain**

### 7.3 Lambda Functions
- [ ] **Create orderHandler function**
  - Runtime: Node.js 20
  - Logic: Validate, store, send emails
- [ ] **Create contactHandler function**
  - Runtime: Node.js 20
  - Logic: Validate, send email
- [ ] **Create spotPriceHandler function** (optional)
  - Runtime: Node.js 20
  - Logic: Return current spot price

### 7.4 SES Setup
- [ ] **Verify sender email** (nick@itprodirect.com)
- [ ] **Create email templates** (optional)
- [ ] **Test email delivery**

### 7.5 DynamoDB Setup (Optional)
- [ ] **Create Orders table**
  - Partition key: orderId
  - Sort key: createdAt

### 7.6 Connect Frontend to Backend
- [ ] **Add AWS_API_BASE to Vercel environment**
- [ ] **Update API routes to forward to AWS**
- [ ] **Test end-to-end order flow**

---

## Phase 8: Deployment

### 8.1 Vercel Deployment
- [ ] **Push code to GitHub**
- [ ] **Connect repo to Vercel**
- [ ] **Configure environment variables in Vercel dashboard**
  - NEXT_PUBLIC_CONTACT_EMAIL
  - AWS_API_BASE (when ready)
- [ ] **Deploy to production**
- [ ] **Verify deployment at bacheco.vercel.app**

### 8.2 Custom Domain (Future)
- [ ] **Purchase domain** (if not already owned)
- [ ] **Configure DNS in Vercel**
- [ ] **Enable HTTPS** (automatic with Vercel)

---

## Phase 9: Pre-Launch QA

### 9.1 Functional Testing
- [ ] **Test all navigation links**
- [ ] **Test theme toggle on all pages**
- [ ] **Test product detail pages**
- [ ] **Test pricing calculator**
- [ ] **Test order form submission**
- [ ] **Test contact form submission**
- [ ] **Test mobile responsiveness**

### 9.2 Content Review
- [ ] **Verify contact email is correct** (nick@itprodirect.com)
- [ ] **Verify pricing tiers are accurate**
- [ ] **Verify all copy is final** (no "coming soon" or placeholders)
- [ ] **Verify dates in terms/privacy are current**

### 9.3 Final Checks
- [ ] **Lighthouse score 90+**
- [ ] **Mobile-friendly test passes**
- [ ] **robots.txt allows crawling**
- [ ] **sitemap.xml is valid**
- [ ] **Error pages work** (404, 500)

---

## Launch! 🚀

- [ ] **Announce to stakeholders**
- [ ] **Monitor for errors in Vercel dashboard**
- [ ] **Test first real order flow**
- [ ] **Set up monitoring/alerting** (optional)

---

## Post-Launch Tasks

- [ ] **Submit sitemap to Google Search Console**
- [ ] **Set up Vercel Analytics** (optional)
- [ ] **Monitor order volume and adjust**
- [ ] **Gather customer feedback**
- [ ] **Plan v2 features**

---

## Maintenance Tasks (Ongoing)

- [ ] **Update spot price fallback as market changes**
- [ ] **Add new products as inventory expands**
- [ ] **Update policy pages as needed**
- [ ] **Backup order data** (once DynamoDB is active)

---

*This checklist is a living document. Update as tasks are completed and new requirements emerge.*
