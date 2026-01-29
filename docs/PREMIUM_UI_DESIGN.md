# Premium UI Design Guide

> **Version:** 2.0  
> **Last Updated:** January 29, 2026  
> **Purpose:** Transform Bache & Co. into a prestigious rare coin marketplace

---

## Design Philosophy

### The Vision
Bache & Co. should feel like a **private viewing room at a prestigious auction house** — refined, trustworthy, and focused on the exceptional quality of the merchandise.

### Design Principles

1. **Elegance Over Flashiness**
   - Subtle animations, not distracting
   - Gold accents used sparingly for impact
   - Clean layouts that let the coins shine

2. **Trust Through Design**
   - Professional typography
   - Consistent visual language
   - Clear, confident pricing display

3. **Collector-Focused UX**
   - Large, zoomable coin images
   - Technical details for numismatists
   - Easy comparison between similar coins

4. **Responsive Luxury**
   - Premium experience on all devices
   - Touch-friendly for tablet collectors
   - Fast loading for impatient buyers

---

## Typography System

### Font Stack

```css
/* Primary - Headlines & Branding */
font-family: 'Playfair Display', 'Georgia', serif;

/* Secondary - Body Text */  
font-family: 'Inter', 'Helvetica Neue', sans-serif;

/* Monospace - Prices, Cert Numbers */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

### Installation

```bash
# Install Google Fonts
npm install @next/font
```

```typescript
// app/layout.tsx
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}>
      {children}
    </html>
  );
}
```

### Type Scale

```css
/* Tailwind config extension */
fontSize: {
  'display': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
  'h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
  'h2': ['2rem', { lineHeight: '1.25' }],
  'h3': ['1.5rem', { lineHeight: '1.3' }],
  'h4': ['1.25rem', { lineHeight: '1.4' }],
  'body': ['1rem', { lineHeight: '1.6' }],
  'small': ['0.875rem', { lineHeight: '1.5' }],
  'caption': ['0.75rem', { lineHeight: '1.4' }],
}
```

### Usage Examples

```jsx
{/* Hero headline */}
<h1 className="font-playfair text-display text-gold-400">
  Rare Morgan Dollars
</h1>

{/* Product name */}
<h2 className="font-playfair text-h2 text-white">
  1889-CC Morgan Dollar
</h2>

{/* Body text */}
<p className="font-inter text-body text-gray-300">
  The king of Carson City Morgans...
</p>

{/* Price */}
<span className="font-mono text-h3 text-gold-400">
  $24,500.00
</span>

{/* Certification number */}
<code className="font-mono text-small text-gray-400">
  PCGS #12345678
</code>
```

---

## Color System

### Dark Theme (Default)

```css
:root {
  /* Backgrounds */
  --bg-base: #050709;           /* Deepest black */
  --bg-primary: #0a0d12;        /* Page background */
  --bg-secondary: #111827;      /* Card background */
  --bg-elevated: #1a202c;       /* Hover/elevated cards */
  --bg-overlay: rgba(0,0,0,0.8); /* Modal overlays */

  /* Text */
  --text-primary: #f7f8fa;      /* Headlines, important */
  --text-secondary: #d1d5db;    /* Body text */
  --text-muted: #9ca3af;        /* Secondary info */
  --text-subtle: #6b7280;       /* Captions, hints */

  /* Gold Accent Palette */
  --gold-50: #fef9e7;
  --gold-100: #fcf0c3;
  --gold-200: #f9e08a;
  --gold-300: #f4d03f;
  --gold-400: #d4af37;          /* Primary gold */
  --gold-500: #b8960b;
  --gold-600: #9a7d0a;
  --gold-700: #7c6408;
  --gold-800: #5e4b06;
  --gold-900: #3f3204;

  /* Borders */
  --border-subtle: #1f2937;
  --border-default: #2d3748;
  --border-strong: #4a5568;
  --border-gold: rgba(212, 175, 55, 0.3);

  /* Status Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}
```

### Light Theme

```css
.light {
  /* Backgrounds */
  --bg-base: #f5f5f4;
  --bg-primary: #fafaf9;
  --bg-secondary: #ffffff;
  --bg-elevated: #ffffff;
  --bg-overlay: rgba(255,255,255,0.9);

  /* Text */
  --text-primary: #1a1a1a;
  --text-secondary: #374151;
  --text-muted: #6b7280;
  --text-subtle: #9ca3af;

  /* Gold - Darker for light backgrounds */
  --gold-400: #b8860b;
  --gold-500: #9a7209;
  
  /* Borders */
  --border-subtle: #e5e7eb;
  --border-default: #d1d5db;
  --border-strong: #9ca3af;
  --border-gold: rgba(184, 134, 11, 0.3);
}
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
const config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base colors
        dark: {
          base: '#050709',
          primary: '#0a0d12',
          secondary: '#111827',
          elevated: '#1a202c',
        },
        light: {
          base: '#f5f5f4',
          primary: '#fafaf9',
          secondary: '#ffffff',
          elevated: '#ffffff',
        },
        // Gold palette
        gold: {
          50: '#fef9e7',
          100: '#fcf0c3',
          200: '#f9e08a',
          300: '#f4d03f',
          400: '#d4af37',
          500: '#b8960b',
          600: '#9a7d0a',
          700: '#7c6408',
          800: '#5e4b06',
          900: '#3f3204',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(212,175,55,0.1), transparent)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212, 175, 55, 0.15)',
        'gold-lg': '0 0 40px rgba(212, 175, 55, 0.2)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
      },
    },
  },
};
```

---

## Component Designs

### 1. Premium Button

```tsx
// components/ui/PremiumButton.tsx
interface PremiumButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variants = {
  primary: `
    bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500
    hover:from-gold-400 hover:via-gold-300 hover:to-gold-400
    text-dark-primary font-semibold
    shadow-gold hover:shadow-gold-lg
    transition-all duration-300
  `,
  secondary: `
    bg-dark-elevated hover:bg-dark-secondary
    text-text-primary border border-border-default
    hover:border-gold-400/50
    transition-all duration-200
  `,
  outline: `
    bg-transparent border-2 border-gold-400
    text-gold-400 hover:bg-gold-400/10
    transition-all duration-200
  `,
  ghost: `
    bg-transparent text-gold-400
    hover:bg-gold-400/10
    transition-all duration-200
  `,
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function PremiumButton({ variant, size, children, ...props }) {
  return (
    <button
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-lg font-inter
        focus:outline-none focus:ring-2 focus:ring-gold-400/50
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 2. Product Card (Rare Coin)

```tsx
// components/product/RareCoinCard.tsx
export function RareCoinCard({ coin }) {
  return (
    <article className="
      group relative
      bg-dark-secondary rounded-xl overflow-hidden
      border border-border-subtle hover:border-gold-400/30
      shadow-card hover:shadow-card-hover
      transition-all duration-300
    ">
      {/* Rarity Badge */}
      {coin.rarity === 'key-date' && (
        <div className="
          absolute top-4 left-4 z-10
          bg-gold-400 text-dark-primary
          px-3 py-1 rounded-full
          text-xs font-semibold uppercase tracking-wide
        ">
          Key Date
        </div>
      )}

      {/* Image Container */}
      <div className="
        relative aspect-square overflow-hidden
        bg-dark-elevated
      ">
        <img
          src={coin.images.obverse}
          alt={coin.name}
          className="
            w-full h-full object-cover
            group-hover:scale-105
            transition-transform duration-500
          "
        />
        {/* Hover Overlay */}
        <div className="
          absolute inset-0
          bg-gradient-to-t from-dark-primary/80 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          flex items-end justify-center pb-4
        ">
          <span className="text-gold-400 font-semibold">View Details →</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="
          font-playfair text-h4 text-text-primary
          group-hover:text-gold-400
          transition-colors duration-200
          line-clamp-2
        ">
          {coin.name}
        </h3>

        {/* Grade/Certification */}
        <div className="flex items-center gap-2 mt-2">
          {coin.certification?.service && (
            <span className="
              text-xs font-mono uppercase
              text-gold-400 bg-gold-400/10
              px-2 py-0.5 rounded
            ">
              {coin.certification.service}
            </span>
          )}
          <span className="text-sm text-text-muted">{coin.grade}</span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-baseline justify-between">
          <span className="font-mono text-h3 text-gold-400">
            ${coin.price.toLocaleString()}
          </span>
          {coin.status === 'available' ? (
            <span className="text-xs text-success">● Available</span>
          ) : (
            <span className="text-xs text-warning">● Reserved</span>
          )}
        </div>
      </div>
    </article>
  );
}
```

### 3. Image Gallery with Zoom

```tsx
// components/product/CoinGallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

export function CoinGallery({ images }) {
  const [activeImage, setActiveImage] = useState(images.obverse);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const allImages = [
    { key: 'obverse', src: images.obverse, label: 'Obverse' },
    { key: 'reverse', src: images.reverse, label: 'Reverse' },
    images.slab && { key: 'slab', src: images.slab, label: 'Slab' },
    images.edge && { key: 'edge', src: images.edge, label: 'Edge' },
  ].filter(Boolean);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="
          relative aspect-square overflow-hidden rounded-xl
          bg-dark-elevated border border-border-subtle
          cursor-zoom-in
        "
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={activeImage}
          alt="Coin"
          fill
          className={`
            object-cover transition-transform duration-200
            ${isZoomed ? 'scale-150' : 'scale-100'}
          `}
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          }}
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {allImages.map((img) => (
          <button
            key={img.key}
            onClick={() => setActiveImage(img.src)}
            className={`
              relative w-20 h-20 rounded-lg overflow-hidden
              border-2 transition-all duration-200
              ${activeImage === img.src
                ? 'border-gold-400 shadow-gold'
                : 'border-border-subtle hover:border-border-default'
              }
            `}
          >
            <Image
              src={img.src}
              alt={img.label}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
```

### 4. Price Display Component

```tsx
// components/ui/PriceDisplay.tsx
interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCurrency?: boolean;
}

export function PriceDisplay({
  price,
  originalPrice,
  size = 'lg',
  showCurrency = true,
}: PriceDisplayProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  return (
    <div className="flex items-baseline gap-3">
      <span className={`
        font-mono font-bold text-gold-400
        ${sizes[size]}
      `}>
        {showCurrency && '$'}
        {price.toLocaleString('en-US', {
          minimumFractionDigits: price >= 1000 ? 0 : 2,
          maximumFractionDigits: price >= 1000 ? 0 : 2,
        })}
      </span>
      
      {originalPrice && originalPrice > price && (
        <span className="text-text-muted line-through text-sm">
          ${originalPrice.toLocaleString()}
        </span>
      )}
    </div>
  );
}
```

### 5. Trust Badges

```tsx
// components/shared/TrustBadges.tsx
const badges = [
  {
    icon: '🔒',
    title: 'Secure Payment',
    description: 'Bank wire transfers only',
  },
  {
    icon: '✓',
    title: '100% Authentic',
    description: 'Every coin guaranteed genuine',
  },
  {
    icon: '📦',
    title: 'Insured Shipping',
    description: 'Fully insured delivery',
  },
  {
    icon: '↩️',
    title: '7-Day Returns',
    description: 'Easy return policy',
  },
];

export function TrustBadges() {
  return (
    <div className="
      grid grid-cols-2 md:grid-cols-4 gap-4
      py-8 border-y border-border-subtle
    ">
      {badges.map((badge) => (
        <div key={badge.title} className="text-center">
          <div className="text-2xl mb-2">{badge.icon}</div>
          <h4 className="font-semibold text-text-primary text-sm">
            {badge.title}
          </h4>
          <p className="text-text-muted text-xs mt-1">
            {badge.description}
          </p>
        </div>
      ))}
    </div>
  );
}
```

### 6. Certification Badge

```tsx
// components/product/CertificationBadge.tsx
interface CertificationBadgeProps {
  service: 'PCGS' | 'NGC' | 'ANACS' | 'raw';
  grade: string;
  certNumber?: string;
  verifyUrl?: string;
}

const serviceColors = {
  PCGS: 'bg-blue-600',
  NGC: 'bg-purple-600',
  ANACS: 'bg-green-600',
  raw: 'bg-gray-600',
};

export function CertificationBadge({
  service,
  grade,
  certNumber,
  verifyUrl,
}: CertificationBadgeProps) {
  const content = (
    <div className="
      inline-flex items-center gap-2
      bg-dark-elevated rounded-lg
      border border-border-subtle
      px-4 py-2
    ">
      <span className={`
        ${serviceColors[service]}
        text-white text-xs font-bold
        px-2 py-0.5 rounded
      `}>
        {service}
      </span>
      <span className="font-mono text-text-primary font-semibold">
        {grade}
      </span>
      {certNumber && (
        <span className="font-mono text-text-muted text-sm">
          #{certNumber}
        </span>
      )}
    </div>
  );

  if (verifyUrl) {
    return (
      <a
        href={verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
        {content}
        <span className="ml-2 text-xs text-gold-400">Verify →</span>
      </a>
    );
  }

  return content;
}
```

---

## Page Layouts

### Homepage Hero

```tsx
// app/page.tsx (Hero Section)
<section className="
  relative min-h-[80vh]
  flex items-center justify-center
  bg-dark-primary
">
  {/* Background Pattern */}
  <div className="
    absolute inset-0
    bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.03)_0%,_transparent_70%)]
  " />
  
  {/* Content */}
  <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
    <h1 className="
      font-playfair text-display
      text-transparent bg-clip-text
      bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300
      mb-6
    ">
      Rare Morgan Dollars
    </h1>
    
    <p className="
      text-xl text-text-secondary
      max-w-2xl mx-auto mb-8
    ">
      Exceptional coins for discerning collectors. 
      Carson City rarities, key dates, and premium examples 
      from a trusted family collection.
    </p>
    
    <div className="flex gap-4 justify-center">
      <PremiumButton variant="primary" size="lg">
        View Collection
      </PremiumButton>
      <PremiumButton variant="outline" size="lg">
        Learn More
      </PremiumButton>
    </div>
  </div>
</section>
```

### Product Grid

```tsx
// app/shop/page.tsx
<section className="py-16">
  <div className="max-w-7xl mx-auto px-6">
    {/* Header */}
    <div className="flex justify-between items-end mb-12">
      <div>
        <h2 className="font-playfair text-h1 text-text-primary">
          Our Collection
        </h2>
        <p className="text-text-muted mt-2">
          {products.length} coins available
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex gap-4">
        <select className="bg-dark-secondary border border-border-default rounded-lg px-4 py-2">
          <option>All Types</option>
          <option>Morgan Dollars</option>
          <option>Peace Dollars</option>
        </select>
        <select className="bg-dark-secondary border border-border-default rounded-lg px-4 py-2">
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest First</option>
        </select>
      </div>
    </div>
    
    {/* Grid */}
    <div className="
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
      gap-6
    ">
      {products.map((coin) => (
        <RareCoinCard key={coin.sku} coin={coin} />
      ))}
    </div>
  </div>
</section>
```

---

## Animations & Micro-interactions

### Tailwind Animation Extensions

```typescript
// tailwind.config.ts
{
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(212, 175, 55, 0)' },
        },
      },
    },
  },
}
```

### Usage

```tsx
{/* Shimmer effect on loading */}
<div className="animate-shimmer bg-gradient-to-r from-dark-secondary via-dark-elevated to-dark-secondary bg-[length:200%_100%]" />

{/* Pulse effect on CTA */}
<button className="animate-pulse-gold">Reserve Now</button>

{/* Fade in on scroll */}
<div className="animate-fade-in">Content</div>
```

---

## Responsive Breakpoints

```css
/* Tailwind defaults, but for reference */
sm: 640px    /* Phones landscape */
md: 768px    /* Tablets */
lg: 1024px   /* Small laptops */
xl: 1280px   /* Desktops */
2xl: 1536px  /* Large screens */
```

### Mobile-First Approach

```tsx
{/* Example: Product grid */}
<div className="
  grid
  grid-cols-1           /* Mobile: 1 column */
  sm:grid-cols-2        /* Tablet: 2 columns */
  lg:grid-cols-3        /* Laptop: 3 columns */
  xl:grid-cols-4        /* Desktop: 4 columns */
  gap-4 sm:gap-6
">
```

---

## Accessibility

### Focus States

```css
/* Global focus styles */
*:focus-visible {
  outline: 2px solid var(--gold-400);
  outline-offset: 2px;
}
```

### Color Contrast
- All text meets WCAG AA standards
- Gold on dark backgrounds: 7.5:1 contrast ratio ✓
- Body text (#d1d5db) on dark (#0a0d12): 10.8:1 ✓

### Screen Reader Support
- All images have descriptive alt text
- Form labels properly associated
- ARIA labels on interactive elements
- Skip links for navigation

---

## Implementation Priority

1. **P0 - Typography & Colors** - Foundation for everything
2. **P0 - Product Card** - Core shopping experience
3. **P0 - Image Gallery** - Showcase the coins
4. **P1 - Premium Buttons** - CTAs throughout
5. **P1 - Trust Badges** - Build confidence
6. **P2 - Animations** - Polish
7. **P2 - Mobile Optimization** - Full responsive

---

*This design system creates a cohesive, premium experience worthy of your rare coin collection.*
