import type { Metadata } from "next";
import { CoinCard } from "@/components/product/CoinCard";
import { TrustBadges } from "@/components/shared/TrustBadges";
import coinData from "@/data/coins.json";
import type { CoinCatalog } from "@/types/coin";

export const metadata: Metadata = {
  title: "Shop Rare Coins",
  description:
    "Browse our curated collection of rare Morgan dollars, Peace dollars, Carson City coins, and more. Premium quality coins for serious collectors.",
};

export default function ShopPage() {
  const catalog = coinData as unknown as CoinCatalog;
  const spotPrice = catalog.spotPriceFallback;

  // Get available coins only
  const availableCoins = catalog.coins.filter(
    (coin) => coin.status === "available" || coin.status === "reserved"
  );

  // Get featured coins
  const featuredCoins = availableCoins.filter((coin) => coin.featured);
  const otherCoins = availableCoins.filter((coin) => !coin.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-radial-gold">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl text-[var(--color-text)] mb-4">
            <span className="text-gradient-gold">Rare Coin</span> Collection
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            Exceptional Morgan dollars, Peace dollars, and classic American coinage.
            Each coin carefully selected for quality and value.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-[var(--color-muted)]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-400"></span>
              {availableCoins.length} coins available
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-400"></span>
              {catalog.categories.length} categories
            </span>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="border-b border-[var(--color-line)] bg-dark-secondary/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="px-4 py-2 rounded-full text-sm font-medium bg-gold-400 text-dark-primary">
              All Coins
            </button>
            {catalog.categories.map((category) => (
              <button
                key={category.slug}
                className="px-4 py-2 rounded-full text-sm font-medium bg-dark-elevated text-[var(--color-muted)] hover:text-gold-400 hover:border-gold-400/30 border border-transparent transition-colors"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Section */}
        {featuredCoins.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-playfair text-2xl md:text-3xl text-[var(--color-text)]">
                  Featured Coins
                </h2>
                <p className="text-[var(--color-muted)] mt-1">
                  Our most exceptional pieces
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredCoins.map((coin) => (
                <CoinCard key={coin.sku} coin={coin} spotPrice={spotPrice} />
              ))}
            </div>
          </section>
        )}

        {/* Trust Badges */}
        <TrustBadges className="mb-16" />

        {/* All Coins Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-playfair text-2xl md:text-3xl text-[var(--color-text)]">
                All Available Coins
              </h2>
              <p className="text-[var(--color-muted)] mt-1">
                {otherCoins.length} coins in inventory
              </p>
            </div>

            {/* Sort Dropdown */}
            <select className="bg-dark-secondary border border-[var(--color-line)] rounded-lg px-4 py-2 text-sm text-[var(--color-text)] focus:border-gold-400 focus:outline-none">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Year: Oldest First</option>
              <option>Year: Newest First</option>
              <option>Recently Added</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {otherCoins.map((coin) => (
              <CoinCard key={coin.sku} coin={coin} spotPrice={spotPrice} />
            ))}
          </div>
        </section>

        {/* Wire Transfer Notice */}
        <section className="mt-16">
          <div
            className="rounded-xl p-8 border text-center bg-dark-secondary"
            style={{ borderColor: "var(--color-border-gold)" }}
          >
            <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-gold-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="font-playfair text-xl text-gold-400 mb-2">
              Secure Payment via Wire Transfer
            </h3>
            <p className="text-[var(--color-muted)] max-w-xl mx-auto">
              To ensure secure transactions for high-value coins, we accept wire
              and ACH bank transfers. Reserve a coin and we&apos;ll send detailed
              payment instructions within 24 hours.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
