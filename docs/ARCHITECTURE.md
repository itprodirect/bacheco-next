# Bache & Co. Architecture

> **Version:** 1.0  
> **Last Updated:** January 19, 2026

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                           FRONTEND                                   │
│                      (Vercel - Next.js)                             │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────────────┐ │
│  │  Browser  │──│   CDN     │──│  Next.js  │──│  API Routes       │ │
│  │  Client   │  │  (Edge)   │  │  Server   │  │  /api/*           │ │
│  └───────────┘  └───────────┘  └───────────┘  └─────────┬─────────┘ │
└───────────────────────────────────────────────────────────────────────
                                                          │
                                                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           BACKEND                                    │
│                      (AWS - Serverless)                             │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐        │
│  │  API Gateway  │───▶│    Lambda     │───▶│   SES/SNS     │        │
│  │  REST API     │    │  Functions    │    │   Email       │        │
│  └───────────────┘    └───────┬───────┘    └───────────────┘        │
│                               │                                      │
│                               ▼                                      │
│                       ┌───────────────┐                              │
│                       │   DynamoDB    │                              │
│                       │   (Optional)  │                              │
│                       └───────────────┘                              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Tree

```
src/
├── app/
│   ├── layout.tsx                 # Root layout
│   │   ├── ThemeProvider          # Dark/light mode context
│   │   ├── Header                 # Site navigation
│   │   └── Footer                 # Site footer
│   │
│   ├── page.tsx                   # Homepage
│   │   ├── HeroBanner
│   │   ├── SpotPriceBanner
│   │   ├── FeaturedProducts
│   │   └── ValueProposition
│   │
│   ├── shop/page.tsx              # Product listing
│   │   ├── SpotPriceBanner
│   │   └── ProductGrid
│   │       └── ProductCard[]
│   │
│   ├── product/[slug]/page.tsx    # Product detail
│   │   ├── ProductGallery
│   │   ├── PriceCalculator
│   │   ├── PremiumTierTable
│   │   └── AddToOrderButton
│   │
│   ├── order/page.tsx             # Reservation form
│   │   ├── OrderForm
│   │   │   ├── CustomerInfo
│   │   │   ├── ProductSelector
│   │   │   ├── QuantityInput
│   │   │   └── PriceSummary
│   │   └── WireInstructions
│   │
│   ├── pricing/page.tsx           # Pricing table
│   │   ├── SpotPriceBanner
│   │   ├── PricingFormula
│   │   └── PremiumTierTable
│   │
│   ├── contact/page.tsx           # Contact form
│   │   └── ContactForm
│   │
│   ├── about/page.tsx             # About page
│   ├── faq/page.tsx               # FAQ page
│   ├── terms/page.tsx             # Terms of service
│   ├── privacy/page.tsx           # Privacy policy
│   │
│   └── api/                       # API routes (Vercel serverless)
│       ├── orders/route.ts        # POST → AWS Lambda
│       ├── contact/route.ts       # POST → AWS Lambda
│       └── spot-price/route.ts    # GET → AWS Lambda or external
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── MobileMenu.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   └── ThemeToggle.tsx
│   │
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── PriceCalculator.tsx
│   │   └── PremiumTierTable.tsx
│   │
│   ├── forms/
│   │   ├── OrderForm.tsx
│   │   ├── ContactForm.tsx
│   │   └── FormField.tsx
│   │
│   └── shared/
│       ├── SpotPriceBanner.tsx
│       ├── LoadingSpinner.tsx
│       └── ErrorBoundary.tsx
│
├── lib/
│   ├── pricing.ts                 # Price calculation logic
│   ├── api.ts                     # API client functions
│   ├── validation.ts              # Form validation schemas
│   └── utils.ts                   # Utility functions
│
├── data/
│   └── products.json              # Static product catalog
│
├── types/
│   ├── product.ts                 # Product interfaces
│   ├── order.ts                   # Order interfaces
│   └── api.ts                     # API response types
│
├── context/
│   └── ThemeContext.tsx           # Theme provider
│
└── styles/
    └── globals.css                # Global styles + Tailwind
```

---

## Data Flow Diagrams

### 1. Page Load Flow

```
User visits /shop
       │
       ▼
┌──────────────────┐
│ Next.js Server   │
│ Component Render │
└────────┬─────────┘
         │
         ├──────────────────────────────┐
         │                              │
         ▼                              ▼
┌─────────────────┐          ┌─────────────────────┐
│ Load products   │          │ Fetch spot price    │
│ from local JSON │          │ (optional API call) │
└────────┬────────┘          └──────────┬──────────┘
         │                              │
         └──────────┬───────────────────┘
                    │
                    ▼
           ┌───────────────┐
           │ Render page   │
           │ with prices   │
           └───────────────┘
```

### 2. Order Submission Flow

```
User fills OrderForm
       │
       ▼
┌──────────────────┐
│ Client-side      │
│ validation       │
└────────┬─────────┘
         │ (if valid)
         ▼
┌──────────────────┐
│ POST /api/orders │
│ (Vercel API)     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Forward to AWS   │
│ API Gateway      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Lambda:          │
│ orderHandler     │
│ - Validate       │
│ - Store order    │
│ - Send emails    │
└────────┬─────────┘
         │
         ├─────────────────┐
         ▼                 ▼
┌─────────────────┐  ┌─────────────────┐
│ Email to        │  │ Email to        │
│ customer        │  │ nick@           │
│ (confirmation)  │  │ itprodirect.com │
└─────────────────┘  └─────────────────┘
         │
         ▼
┌──────────────────┐
│ Return order ID  │
│ + wire instruct. │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Display          │
│ confirmation     │
│ page             │
└──────────────────┘
```

### 3. Theme Toggle Flow

```
User clicks ThemeToggle
       │
       ▼
┌──────────────────────┐
│ toggleTheme()        │
│ in ThemeContext      │
└────────┬─────────────┘
         │
         ├─────────────────────────────┐
         │                             │
         ▼                             ▼
┌─────────────────────┐   ┌──────────────────────┐
│ Update <html>       │   │ Save to localStorage │
│ class="dark|light"  │   │ theme="dark|light"   │
└─────────────────────┘   └──────────────────────┘
         │
         ▼
┌──────────────────────┐
│ Tailwind CSS applies │
│ dark: or light:      │
│ variants             │
└──────────────────────┘
```

---

## API Contract

### POST /api/orders

**Request:**
```typescript
interface OrderRequest {
  // Customer Info
  name: string;
  email: string;
  phone?: string;
  
  // Order Details
  product: string;        // SKU
  quantity: number;
  
  // Calculated on server
  spotPriceAtOrder?: number;
  totalPrice?: number;
  
  // Optional
  notes?: string;
}
```

**Response (Success):**
```typescript
interface OrderResponse {
  success: true;
  orderId: string;
  message: string;
  wireInstructions: {
    bankName: string;
    routingNumber: string;
    accountNumber: string;
    accountName: string;
    reference: string;
    paymentDeadline: string;
  };
}
```

**Response (Error):**
```typescript
interface ErrorResponse {
  success: false;
  error: string;
  details?: Record<string, string>;
}
```

### POST /api/contact

**Request:**
```typescript
interface ContactRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
```

**Response:**
```typescript
interface ContactResponse {
  success: boolean;
  message: string;
}
```

### GET /api/spot-price

**Response:**
```typescript
interface SpotPriceResponse {
  spot: number;
  currency: 'USD';
  source: string;
  timestamp: string;
  fallback: boolean;
}
```

---

## Technology Stack

### Frontend (Vercel)

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.x | App Router, SSR/SSG |
| React | 18.x | UI components |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |
| Zod | 3.x | Schema validation |

### Backend (AWS)

| Service | Purpose |
|---------|---------|
| API Gateway | REST API endpoints |
| Lambda (Node.js 20) | Request handlers |
| SES | Transactional email |
| DynamoDB | Order storage (optional) |
| CloudWatch | Logging & monitoring |

### Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| Prettier | Code formatting |
| TypeScript | Type checking |
| Vercel CLI | Local development |
| AWS SAM/Serverless | Lambda deployment |

---

## Security Considerations

### Frontend

- **No secrets in client code** - All API keys in environment variables
- **Form validation** - Client-side + server-side
- **Rate limiting** - Via Vercel Edge or AWS API Gateway
- **XSS prevention** - React's default escaping + CSP headers
- **HTTPS only** - Enforced by Vercel

### Backend

- **Input sanitization** - All Lambda inputs validated
- **CORS configuration** - Restrict to Vercel domain
- **API key management** - AWS Secrets Manager (if needed)
- **Email validation** - Verify format before sending
- **Fraud prevention** - Manual order review before shipping

### Payment Security (Wire/ACH)

- **No card data collected** - Wire transfer only
- **Bank details displayed** - Not stored in forms
- **Manual verification** - Confirm funds received before shipping
- **Order reference** - Unique ID for payment matching

---

## Performance Targets

| Metric | Target | Method |
|--------|--------|--------|
| Largest Contentful Paint | < 2.5s | Static generation, image optimization |
| First Input Delay | < 100ms | Minimal client JS |
| Cumulative Layout Shift | < 0.1 | Reserved space for dynamic content |
| Time to First Byte | < 200ms | Edge caching via Vercel |
| Lighthouse Performance | 90+ | All of the above |

---

## Monitoring & Observability

### Vercel

- Deployment logs
- Edge function logs
- Analytics (optional)
- Real User Monitoring (optional)

### AWS

- CloudWatch logs for Lambda
- API Gateway metrics
- SES delivery metrics
- DynamoDB read/write metrics

### Alerting

- Lambda errors → CloudWatch Alarm → Email/Slack
- SES bounce rate → CloudWatch Alarm
- API 5xx rate → CloudWatch Alarm

---

## Scalability Notes

### Current Design (MVP)

- **Spot price:** Fallback to static value, manual updates
- **Products:** Static JSON, deployed with code
- **Orders:** Email-based, manual processing

### Future Enhancements (Post-MVP)

- **Live spot feed:** External API integration with caching
- **Inventory management:** DynamoDB with stock tracking
- **Order dashboard:** Admin UI for order management
- **Payment integration:** Stripe/PayPal for card payments (after customer history established)
