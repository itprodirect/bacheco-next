import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CoinGallery } from "@/components/product/CoinGallery";
import { CertificationBadge } from "@/components/product/CertificationBadge";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { ReservationForm } from "@/components/forms/ReservationForm";
import coinData from "@/data/coins.json";
import type { Coin, CoinCatalog } from "@/types/coin";

interface PageProps {
  params: Promise<{ sku: string }>;
}

// Generate static params for all coins
export async function generateStaticParams() {
  const catalog = coinData as unknown as CoinCatalog;
  return catalog.coins.map((coin) => ({
    sku: coin.sku,
  }));
}

// Generate metadata for each coin page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sku } = await params;
  const catalog = coinData as unknown as CoinCatalog;
  const coin = catalog.coins.find((c) => c.sku === sku);

  if (!coin) {
    return { title: "Coin Not Found" };
  }

  return {
    title: coin.name,
    description: coin.description,
    openGraph: {
      title: `${coin.name} | Bache & Co.`,
      description: coin.description,
      images: [coin.images.obverse],
    },
  };
}

export default async function CoinDetailPage({ params }: PageProps) {
  const { sku } = await params;
  const catalog = coinData as unknown as CoinCatalog;
  const coin = catalog.coins.find((c) => c.sku === sku);

  if (!coin) {
    notFound();
  }

  // Get related coins (same category, different coin)
  const relatedCoins = catalog.coins
    .filter(
      (c) =>
        c.sku !== coin.sku &&
        c.status === "available" &&
        c.category.some((cat) => coin.category.includes(cat))
    )
    .slice(0, 4);

  const rarityLabels: Record<string, string> = {
    "key-date": "Key Date",
    "ultra-rare": "Ultra Rare",
    "semi-key": "Semi-Key",
    "better-date": "Better Date",
    common: "Common Date",
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--color-line)] bg-dark-secondary/30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-[var(--color-muted)] hover:text-gold-400"
            >
              Home
            </Link>
            <span className="text-[var(--color-muted)]">/</span>
            <Link
              href="/shop"
              className="text-[var(--color-muted)] hover:text-gold-400"
            >
              Shop
            </Link>
            <span className="text-[var(--color-muted)]">/</span>
            <span className="text-[var(--color-text)]">{coin.shortName}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Gallery */}
          <div>
            <CoinGallery images={coin.images} coinName={coin.name} />
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Status & Rarity Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {coin.rarity !== "common" && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-gold-400 text-dark-primary">
                  {rarityLabels[coin.rarity]}
                </span>
              )}
              {coin.status === "available" ? (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                  Available
                </span>
              ) : coin.status === "reserved" ? (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                  Reserved
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                  Sold
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-playfair text-3xl md:text-4xl text-[var(--color-text)]">
              {coin.name}
            </h1>

            {/* Certification */}
            {coin.certification && coin.certification.service !== "raw" && (
              <CertificationBadge
                certification={coin.certification}
                showVerifyLink={true}
              />
            )}

            {/* Price */}
            <div className="py-4 border-y border-[var(--color-line)]">
              <PriceDisplay
                price={coin.price}
                priceType={coin.priceType}
                size="xl"
                spotPrice={catalog.spotPriceFallback}
                weightOz={coin.weightOz}
              />
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[var(--color-muted)] uppercase tracking-wide">
                  Year
                </p>
                <p className="text-[var(--color-text)] font-medium">
                  {coin.year > 0 ? coin.year : "Various Dates"}
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)] uppercase tracking-wide">
                  Mint
                </p>
                <p className="text-[var(--color-text)] font-medium">
                  {coin.mintMark === "P"
                    ? "Philadelphia"
                    : coin.mintMark === "O"
                      ? "New Orleans"
                      : coin.mintMark === "S"
                        ? "San Francisco"
                        : coin.mintMark === "CC"
                          ? "Carson City"
                          : coin.mintMark === "D"
                            ? "Denver"
                            : coin.mintMark}
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)] uppercase tracking-wide">
                  Grade
                </p>
                <p className="text-[var(--color-text)] font-medium">
                  {coin.grade}
                </p>
              </div>
              {coin.mintage && coin.mintage > 0 && (
                <div>
                  <p className="text-xs text-[var(--color-muted)] uppercase tracking-wide">
                    Mintage
                  </p>
                  <p className="text-[var(--color-text)] font-medium">
                    {coin.mintage.toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Highlights */}
            {coin.highlights.length > 0 && (
              <div>
                <h3 className="font-playfair text-lg text-[var(--color-text)] mb-3">
                  Highlights
                </h3>
                <ul className="space-y-2">
                  {coin.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-[var(--color-muted)]"
                    >
                      <svg
                        className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust Badges - Compact */}
            <TrustBadges variant="vertical" />
          </div>
        </div>

        {/* Description Section */}
        <section className="mt-12 pt-8 border-t border-[var(--color-line)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="font-playfair text-2xl text-[var(--color-text)] mb-4">
                About This Coin
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                {coin.description}
              </p>

              {coin.provenance && (
                <div className="mt-6">
                  <h3 className="font-playfair text-lg text-[var(--color-text)] mb-2">
                    Provenance
                  </h3>
                  <p className="text-[var(--color-muted)]">{coin.provenance}</p>
                </div>
              )}

              {coin.variety && (
                <div className="mt-6">
                  <h3 className="font-playfair text-lg text-[var(--color-text)] mb-2">
                    Variety
                  </h3>
                  <p className="text-[var(--color-muted)]">{coin.variety}</p>
                </div>
              )}
            </div>

            {/* Reservation Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-dark-secondary rounded-xl border border-[var(--color-line)] p-6">
                  <h3 className="font-playfair text-xl text-[var(--color-text)] mb-4">
                    Reserve This Coin
                  </h3>
                  {coin.status === "available" ? (
                    <ReservationForm coin={coin} />
                  ) : coin.status === "reserved" ? (
                    <div className="text-center py-6">
                      <p className="text-yellow-400 font-medium mb-2">
                        Currently Reserved
                      </p>
                      <p className="text-sm text-[var(--color-muted)]">
                        This coin is reserved pending payment. Contact us if
                        you&apos;d like to be notified if it becomes available.
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-red-400 font-medium mb-2">Sold</p>
                      <p className="text-sm text-[var(--color-muted)]">
                        This coin has been sold. Browse our collection for
                        similar pieces.
                      </p>
                      <Link
                        href="/shop"
                        className="inline-block mt-4 text-gold-400 hover:text-gold-300"
                      >
                        Browse Collection &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Coins */}
        {relatedCoins.length > 0 && (
          <section className="mt-16 pt-8 border-t border-[var(--color-line)]">
            <h2 className="font-playfair text-2xl text-[var(--color-text)] mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedCoins.map((relatedCoin) => (
                <Link
                  key={relatedCoin.sku}
                  href={`/coin/${relatedCoin.sku}`}
                  className="group block bg-dark-secondary rounded-lg border border-[var(--color-line)] hover:border-gold-400/30 overflow-hidden transition-colors"
                >
                  <div className="aspect-square bg-dark-elevated p-4">
                    <img
                      src={relatedCoin.images.obverse}
                      alt={relatedCoin.shortName}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-[var(--color-text)] font-medium line-clamp-1 group-hover:text-gold-400">
                      {relatedCoin.shortName}
                    </p>
                    <p className="text-sm text-gold-400 font-mono mt-1">
                      {relatedCoin.price > 0
                        ? `$${relatedCoin.price.toLocaleString()}`
                        : "Call"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
