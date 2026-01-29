# Implementation Checklist V2.0

> **Version:** 2.0  
> **Last Updated:** January 29, 2026  
> **For Use With:** Claude Code  
> **Builds On:** Existing bacheco-next site

---

## How to Use This Checklist

This checklist builds on the existing deployed site at https://bacheco-next.vercel.app. Each task includes context and verification steps. Work through phases in order.

**Prerequisites:**
- Clone repo: `git clone https://github.com/itprodirect/bacheco-next.git`
- Install deps: `npm install`
- Run locally: `npm run dev`

---

## Phase 1: Inventory & Setup (Day 1)

### 1.1 Image Inventory
- [ ] **List all images in products folder**
  ```bash
  ls -la public/images/products/
  ```
- [ ] **Create image inventory spreadsheet**
  - Document each image file
  - Note: obverse/reverse pairs
  - Identify which coins they represent
- [ ] **Organize images by coin**
  - Rename to follow convention: `[year]-[mintmark]-[grade]-[view].jpg`
  - Example: `1889-cc-ms63-obverse.jpg`

### 1.2 Product Planning
- [ ] **Create list of coins to sell**
  - Reference your physical inventory
  - Note: year, mint mark, grade, certification
  - Set prices based on market research
- [ ] **Categorize coins**
  - Carson City
  - Key Dates
  - Better Dates
  - Common BU

### 1.3 Update Documentation
- [ ] **Copy upgrade docs to repo**
  - UPGRADE_PLAN_V2.md → repo root
  - docs/PREMIUM_UI_DESIGN.md
  - docs/RARE_COIN_CATALOG.md
  - docs/PAYMENT_IMPLEMENTATION.md
- [ ] **Update CLAUDE.md with new context**
- [ ] **Commit planning docs**
  ```bash
  git add .
  git commit -m "docs: add V2 upgrade planning documents"
  ```

---

## Phase 2: Data Layer Updates (Day 2)

### 2.1 Update Type Definitions
- [ ] **Extend coin types**
  - File: `src/types/coin.ts`
  - Add: certification, rarity, category, provenance
  - See RARE_COIN_CATALOG.md for full interface
- [ ] **Create order types**
  - File: `src/types/order.ts`
  - Add: Order, OrderItem, OrderStatus, Customer
  - See PAYMENT_IMPLEMENTATION.md for schema

### 2.2 Update Product Data
- [ ] **Expand products.json / coins.json**
  - Add rare coins from your inventory
  - Include all fields from new schema
  - Set accurate prices
- [ ] **Add categories.json**
  - Define: carson-city, key-dates, better-dates, peace-dollars, common-bu
- [ ] **Verify all image paths are correct**

### 2.3 Update Pricing Logic
- [ ] **Update pricing utilities**
  - File: `src/lib/pricing.ts`
  - Support fixed prices (rare coins)
  - Support spot-based prices (common BU)
  - Add currency formatter for large amounts

---

## Phase 3: Premium UI Foundation (Days 3-4)

### 3.1 Typography Setup
- [ ] **Install Google Fonts**
  ```bash
  # Already using next/font, just configure
  ```
- [ ] **Configure fonts in layout.tsx**
  - Add Playfair Display (headlines)
  - Keep Inter (body)
  - Add JetBrains Mono (prices, code)
- [ ] **Update font CSS variables**
  - `--font-playfair`
  - `--font-inter`
  - `--font-mono`

### 3.2 Color System Update
- [ ] **Update tailwind.config.ts**
  - Add premium gold palette (gold-50 through gold-900)
  - Add dark-base, dark-elevated colors
  - Add shadow-gold, shadow-gold-lg
  - Add gold-gradient background
- [ ] **Update globals.css**
  - Add CSS custom properties
  - Update dark/light theme variables
- [ ] **Test theme toggle still works**

### 3.3 Base Component Updates
- [ ] **Update Button component**
  - File: `src/components/ui/Button.tsx`
  - Add premium variant with gold gradient
  - Add subtle animations
- [ ] **Update Card component**
  - Better hover states
  - Gold border on hover
  - Elevated shadow
- [ ] **Create Badge component**
  - For "Key Date", "PCGS", "NGC", etc.

---

## Phase 4: Product Display Components (Days 4-5)

### 4.1 Product Card Redesign
- [ ] **Update ProductCard component**
  - File: `src/components/product/ProductCard.tsx`
  - Add rarity badge (key-date, semi-key)
  - Add certification badge (PCGS, NGC)
  - Improve hover effects
  - Better price display for high values
- [ ] **Create ProductCardSkeleton**
  - Loading state while images load

### 4.2 Image Gallery
- [ ] **Create CoinGallery component**
  - File: `src/components/product/CoinGallery.tsx`
  - Multi-image support (obverse, reverse, slab)
  - Hover zoom functionality
  - Thumbnail navigation
- [ ] **Optimize images**
  - Use Next.js Image component
  - Configure image sizes
  - Add blur placeholder

### 4.3 Certification Display
- [ ] **Create CertificationBadge component**
  - File: `src/components/product/CertificationBadge.tsx`
  - PCGS (blue), NGC (purple), raw (gray)
  - Display grade and cert number
  - Link to verification URL
- [ ] **Create ProvenanceCard component**
  - Display coin history
  - Certification details

### 4.4 Price Components
- [ ] **Create PriceDisplay component**
  - Handle $100 to $50,000+ range
  - Monospace font
  - Gold color for prices
  - Support "Call for Price" option

---

## Phase 5: Page Updates (Days 5-6)

### 5.1 Homepage Redesign
- [ ] **Update Hero section**
  - New headline: "Rare Morgan Dollars"
  - Premium gradient text
  - Better CTA buttons
- [ ] **Add Featured Coins section**
  - Showcase 3-4 best items
  - Link to individual pages
- [ ] **Add Trust Badges**
  - Authenticity guarantee
  - Insured shipping
  - Secure payment
- [ ] **Update SpotPriceBanner styling**

### 5.2 Shop Page Updates
- [ ] **Add category filters**
  - Carson City, Key Dates, Better Dates, etc.
- [ ] **Add price range filter**
- [ ] **Add sort options**
  - Price: Low to High / High to Low
  - Date Added
  - Rarity
- [ ] **Update grid layout**
  - 4 columns on desktop
  - 2 columns on tablet
  - 1 column on mobile
- [ ] **Add "X coins available" count**

### 5.3 Product Detail Page
- [ ] **Update layout**
  - Gallery on left, details on right
  - Larger images
- [ ] **Add coin details section**
  - Year, mint mark, mintage
  - Grade and certification
  - Weight and composition
- [ ] **Add "Reserve This Coin" CTA**
  - Links to order page with coin pre-selected
- [ ] **Add related coins section**
  - Similar coins customer might like

### 5.4 Pricing Page Updates
- [ ] **Clarify pricing model**
  - Fixed prices for rare coins
  - Spot-based for common BU
- [ ] **Add market comparison**
  - Show competitive positioning

---

## Phase 6: Order System (Days 6-8)

### 6.1 Reservation Form
- [ ] **Install form dependencies**
  ```bash
  npm install react-hook-form @hookform/resolvers zod
  ```
- [ ] **Create ReservationForm component**
  - File: `src/components/forms/ReservationForm.tsx`
  - Fields: name, email, phone, notes
  - Terms checkbox
  - Order summary display
- [ ] **Add form validation**
  - Zod schema
  - Error display
  - Loading states

### 6.2 Order Confirmation Page
- [ ] **Create /order/confirmation/[orderId] route**
  - Display order summary
  - Show wire transfer instructions
  - Payment deadline countdown
  - Print-friendly version
- [ ] **Create WireInstructions component**
  - Bank details (use placeholders initially)
  - Copy-to-clipboard functionality
  - ACH vs Wire instructions

### 6.3 API Routes
- [ ] **Update /api/orders route**
  - File: `src/app/api/orders/route.ts`
  - Validate input
  - Generate order ID
  - Calculate totals
  - Return wire instructions
- [ ] **Add order storage (optional for MVP)**
  - Local JSON file for testing
  - DynamoDB later

### 6.4 Email Integration
- [ ] **Choose email provider**
  - Option A: AWS SES (if already using AWS)
  - Option B: Resend (easy setup)
  - Option C: SendGrid (free tier)
- [ ] **Set up email templates**
  - Order confirmation (to customer)
  - New order alert (to admin)
- [ ] **Configure environment variables**
  - `EMAIL_FROM`, `ADMIN_EMAIL`, API keys
- [ ] **Test email delivery**

---

## Phase 7: Trust & Polish (Days 8-9)

### 7.1 Trust Elements
- [ ] **Create TrustBadges component**
  - Authenticity guarantee
  - Secure payment
  - Insured shipping
  - Return policy
- [ ] **Add to key pages**
  - Homepage
  - Product pages
  - Order page

### 7.2 About Page Update
- [ ] **Rewrite About content**
  - Family business story
  - Numismatic expertise
  - Customer commitment
- [ ] **Add contact info prominently**
  - Email: nick@itprodirect.com
  - Location (Tampa Bay area)

### 7.3 FAQ Updates
- [ ] **Add payment FAQ**
  - "Why wire transfer only?"
  - "How do I send a wire?"
  - "How long until my order ships?"
- [ ] **Add coin FAQ**
  - Grading explanation
  - Certification services
  - Return policy

### 7.4 Legal Pages
- [ ] **Update Terms of Service**
  - Payment terms
  - Return policy (7 days)
  - Shipping policy
- [ ] **Update Privacy Policy**
  - What data collected
  - How it's used
- [ ] **Update dates to current**

---

## Phase 8: SEO & Performance (Day 9)

### 8.1 SEO Optimization
- [ ] **Add metadata to all pages**
  - Unique titles and descriptions
  - Open Graph images
- [ ] **Create product-specific meta**
  - Dynamic OG images with coin photos
- [ ] **Update sitemap.xml**
  - Include all product pages
- [ ] **Verify robots.txt allows crawling**

### 8.2 Performance
- [ ] **Run Lighthouse audit**
- [ ] **Optimize images**
  - Convert to WebP where possible
  - Use appropriate sizes
  - Lazy loading
- [ ] **Check Core Web Vitals**
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- [ ] **Target: 90+ performance score**

### 8.3 Mobile Optimization
- [ ] **Test on real devices**
  - iPhone, Android
  - Tablet
- [ ] **Fix any touch issues**
- [ ] **Verify forms work on mobile**

---

## Phase 9: Pre-Launch QA (Day 10)

### 9.1 Functional Testing
- [ ] **Test all navigation links**
- [ ] **Test theme toggle on all pages**
- [ ] **Test product filters and sorting**
- [ ] **Test order flow end-to-end**
  - Select coin
  - Fill form
  - Submit
  - Verify confirmation page
  - Check emails sent
- [ ] **Test on multiple browsers**
  - Chrome, Firefox, Safari, Edge

### 9.2 Content Review
- [ ] **Verify all coin details are accurate**
  - Years, mint marks, grades
  - Prices match intended pricing
- [ ] **Check all images display correctly**
- [ ] **Proofread all copy**
- [ ] **Verify contact email is correct**
- [ ] **Check wire transfer details are ready**

### 9.3 Security Check
- [ ] **Ensure no secrets in code**
- [ ] **Verify environment variables set in Vercel**
- [ ] **Test form validation handles bad input**

---

## Phase 10: Launch! 🚀 (Day 10)

### 10.1 Deploy
- [ ] **Push all changes to main branch**
- [ ] **Verify Vercel deployment successful**
- [ ] **Check live site at bacheco-next.vercel.app**

### 10.2 Post-Launch
- [ ] **Submit to Google Search Console**
- [ ] **Set up Vercel Analytics (optional)**
- [ ] **Announce to potential customers**
- [ ] **Monitor for errors in Vercel dashboard**

### 10.3 First Order Readiness
- [ ] **Bank account ready to receive wires**
- [ ] **Shipping supplies on hand**
- [ ] **Insurance coverage confirmed**
- [ ] **Process for verifying payments clear**

---

## Post-Launch Improvements

### Week 2
- [ ] Set up AWS backend for order storage
- [ ] Add admin dashboard for order management
- [ ] Implement payment timeout automation
- [ ] Add more coins to inventory

### Month 1
- [ ] Collect and display customer testimonials
- [ ] Consider custom domain purchase
- [ ] Add email newsletter signup
- [ ] Analyze traffic and conversion

### Future
- [ ] Add Stripe/PayPal for established customers
- [ ] Build customer accounts
- [ ] Add wishlist functionality
- [ ] Consider auction features for rare coins

---

## Quick Reference: Key Files to Modify

| File | Purpose | Priority |
|------|---------|----------|
| `src/types/coin.ts` | Coin data types | P0 |
| `src/types/order.ts` | Order data types | P0 |
| `src/data/coins.json` | Product catalog | P0 |
| `tailwind.config.ts` | Design system | P0 |
| `src/app/globals.css` | Global styles | P0 |
| `src/components/product/ProductCard.tsx` | Product display | P0 |
| `src/components/product/CoinGallery.tsx` | Image gallery | P0 |
| `src/components/forms/ReservationForm.tsx` | Order form | P0 |
| `src/app/api/orders/route.ts` | Order API | P0 |
| `src/app/page.tsx` | Homepage | P1 |
| `src/app/shop/page.tsx` | Shop listing | P1 |
| `src/app/product/[slug]/page.tsx` | Product detail | P1 |

---

## Environment Variables Needed

```bash
# .env.local

# Existing
NEXT_PUBLIC_CONTACT_EMAIL=nick@itprodirect.com
NEXT_PUBLIC_SITE_URL=https://bacheco-next.vercel.app

# New for email
EMAIL_PROVIDER=resend  # or ses, sendgrid
EMAIL_API_KEY=re_xxxxx
EMAIL_FROM=orders@bacheco.com  # or nick@itprodirect.com
ADMIN_EMAIL=nick@itprodirect.com

# Wire transfer details (server-side only)
WIRE_BANK_NAME=Your Bank
WIRE_ROUTING=123456789
WIRE_ACCOUNT=9876543210
WIRE_ACCOUNT_NAME=Bache & Co.
```

---

*Let's build a premium rare coin marketplace!*
