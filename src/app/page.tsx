import Link from "next/link";
import { CoinCard } from "@/components/product/CoinCard";
import { TrustBadges } from "@/components/shared/TrustBadges";
import coinData from "@/data/coins.json";
import type { CoinCatalog } from "@/types/coin";

export default function Home() {
  const catalog = coinData as unknown as CoinCatalog;
  const spotPrice = catalog.spotPriceFallback;

  // Get featured coins
  const featuredCoins = catalog.coins
    .filter((coin) => coin.featured && coin.status === "available")
    .slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-radial-gold" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,175,55,0.05)_0%,_transparent_50%)]" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-20">
          <p className="text-gold-400 text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Est. Tampa Bay, Florida
          </p>

          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-[var(--color-text)] mb-6 leading-tight">
            <span className="text-gradient-gold">Rare Morgan</span>
            <br />
            <span className="text-[var(--color-text)]">& Peace Dollars</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto mb-10">
            Exceptional coins for discerning collectors. Carson City rarities,
            key dates, and premium examples from a trusted family collection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="
                inline-block px-8 py-4 rounded-lg font-semibold
                bg-gold-gradient text-dark-primary
                shadow-gold hover:shadow-gold-lg
                transition-all duration-300
              "
            >
              View Collection
            </Link>
            <Link
              href="/about"
              className="
                inline-block px-8 py-4 rounded-lg font-semibold
                bg-transparent border-2 border-gold-400
                text-gold-400 hover:bg-gold-400/10
                transition-all duration-200
              "
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Coins Section */}
      {featuredCoins.length > 0 && (
        <section className="py-20 bg-dark-secondary/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl text-[var(--color-text)] mb-4">
                Featured <span className="text-gold-400">Coins</span>
              </h2>
              <p className="text-[var(--color-muted)] max-w-xl mx-auto">
                Hand-selected pieces from our current inventory
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCoins.map((coin) => (
                <CoinCard key={coin.sku} coin={coin} spotPrice={spotPrice} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-medium transition-colors"
              >
                View All {catalog.coins.length} Coins
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="py-12 border-y border-[var(--color-line)]">
        <div className="max-w-6xl mx-auto px-4">
          <TrustBadges variant="compact" className="justify-center" />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl text-[var(--color-text)] mb-4">
              How It <span className="text-gold-400">Works</span>
            </h2>
            <p className="text-[var(--color-muted)]">
              Simple, secure process for acquiring rare coins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Browse & Select",
                description:
                  "Explore our curated collection of rare Morgan dollars, Peace dollars, and classic American coinage.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Reserve Your Coin",
                description:
                  "Submit a reservation request. We confirm availability and send detailed payment instructions.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Secure Delivery",
                description:
                  "Complete payment via wire transfer. Your coin ships fully insured once payment clears.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.step}
                className="
                  relative p-8 rounded-xl
                  bg-dark-secondary border border-[var(--color-line)]
                  hover:border-gold-400/30 transition-colors
                "
              >
                {/* Step Number */}
                <span className="absolute top-6 right-6 font-mono text-4xl font-bold text-dark-elevated">
                  {item.step}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center mb-6 text-gold-400">
                  {item.icon}
                </div>

                <h3 className="font-playfair text-xl text-[var(--color-text)] mb-3">
                  {item.title}
                </h3>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-dark-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl text-[var(--color-text)] mb-4">
              Shop by <span className="text-gold-400">Category</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {catalog.categories.slice(0, 6).map((category) => (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="
                  group p-6 rounded-xl
                  bg-dark-secondary border border-[var(--color-line)]
                  hover:border-gold-400/30 hover:bg-dark-elevated
                  transition-all duration-200
                "
              >
                <h3 className="font-playfair text-lg text-[var(--color-text)] group-hover:text-gold-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-[var(--color-muted)] mt-1 line-clamp-2">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl text-[var(--color-text)] mb-4">
            Ready to Start Your Collection?
          </h2>
          <p className="text-[var(--color-muted)] mb-8 max-w-xl mx-auto">
            Browse our inventory of rare Morgan and Peace dollars. Each coin is
            photographed and described in detail.
          </p>
          <Link
            href="/shop"
            className="
              inline-block px-10 py-4 rounded-lg font-semibold
              bg-gold-gradient text-dark-primary
              shadow-gold hover:shadow-gold-lg
              transition-all duration-300
            "
          >
            Browse Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
