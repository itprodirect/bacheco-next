import Link from "next/link";
import Image from "next/image";
import type { Coin } from "@/types/coin";
import { CertificationBadge } from "./CertificationBadge";
import { PriceDisplay } from "@/components/ui/PriceDisplay";

interface CoinCardProps {
  coin: Coin;
  spotPrice?: number;
}

const rarityLabels: Record<string, { label: string; className: string }> = {
  "key-date": {
    label: "Key Date",
    className: "bg-gold-400 text-dark-primary",
  },
  "ultra-rare": {
    label: "Ultra Rare",
    className: "bg-gradient-to-r from-gold-500 to-gold-300 text-dark-primary",
  },
  "semi-key": {
    label: "Semi-Key",
    className: "bg-gold-600/80 text-white",
  },
  "better-date": {
    label: "Better Date",
    className: "bg-dark-elevated text-gold-400 border border-gold-400/30",
  },
};

export function CoinCard({ coin, spotPrice }: CoinCardProps) {
  const rarityInfo = rarityLabels[coin.rarity];

  return (
    <Link
      href={`/coin/${coin.sku}`}
      className="
        group relative block
        bg-dark-secondary rounded-xl overflow-hidden
        border border-[var(--color-line)] hover:border-gold-400/30
        shadow-card hover:shadow-card-hover
        transition-all duration-300
      "
    >
      {/* Rarity Badge */}
      {rarityInfo && coin.rarity !== "common" && (
        <div
          className={`
            absolute top-4 left-4 z-10
            px-3 py-1 rounded-full
            text-xs font-semibold uppercase tracking-wide
            ${rarityInfo.className}
          `}
        >
          {rarityInfo.label}
        </div>
      )}

      {/* Featured Badge */}
      {coin.featured && (
        <div
          className="
            absolute top-4 right-4 z-10
            w-8 h-8 rounded-full
            bg-gold-400/20 border border-gold-400/50
            flex items-center justify-center
          "
          title="Featured"
        >
          <svg
            className="w-4 h-4 text-gold-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-dark-elevated">
        <Image
          src={coin.images.obverse}
          alt={coin.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="
            object-contain p-4
            group-hover:scale-105
            transition-transform duration-500
          "
        />

        {/* Hover Overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t from-dark-primary/90 via-dark-primary/20 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            flex items-end justify-center pb-6
          "
        >
          <span className="text-gold-400 font-semibold text-sm">
            View Details &rarr;
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3
          className="
            font-playfair text-lg text-[var(--color-text)]
            group-hover:text-gold-400
            transition-colors duration-200
            line-clamp-2 leading-tight
          "
        >
          {coin.name}
        </h3>

        {/* Year and Mint Mark */}
        <p className="text-sm text-[var(--color-muted)] mt-1">
          {coin.year > 0 ? coin.year : "Various"} {coin.mintMark !== "P" && `• ${coin.mintMark} Mint`}
          {coin.variety && ` • ${coin.variety}`}
        </p>

        {/* Grade/Certification */}
        <div className="flex items-center gap-2 mt-3">
          {coin.certification ? (
            <CertificationBadge certification={coin.certification} size="sm" />
          ) : (
            <span className="text-sm text-[var(--color-muted)]">
              {coin.grade}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-4 flex items-end justify-between">
          <PriceDisplay
            price={coin.price}
            priceType={coin.priceType}
            size="md"
            spotPrice={spotPrice}
            weightOz={coin.weightOz}
          />

          {/* Status indicator */}
          <div className="flex items-center gap-1.5">
            {coin.status === "available" ? (
              <>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-xs text-green-400">Available</span>
              </>
            ) : coin.status === "reserved" ? (
              <>
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                <span className="text-xs text-yellow-400">Reserved</span>
              </>
            ) : coin.status === "sold" ? (
              <>
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="text-xs text-red-400">Sold</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-xs text-blue-400">Coming Soon</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
