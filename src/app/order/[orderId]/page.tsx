import type { Metadata } from "next";
import Link from "next/link";
import { TrustBadges } from "@/components/shared/TrustBadges";
import coinData from "@/data/coins.json";
import type { CoinCatalog } from "@/types/coin";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description: "Your order has been received. Review payment instructions.",
};

interface PageProps {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ coin?: string }>;
}

export default async function OrderConfirmationPage({
  params,
  searchParams,
}: PageProps) {
  const { orderId } = await params;
  const { coin: coinSku } = await searchParams;

  // Get coin details if available
  const catalog = coinData as unknown as CoinCatalog;
  const coin = coinSku ? catalog.coins.find((c) => c.sku === coinSku) : null;

  // Calculate deadline (72 hours from now)
  const deadline = new Date();
  deadline.setHours(deadline.getHours() + 72);
  const deadlineStr = deadline.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Success Header */}
      <div className="bg-dark-secondary border-b border-[var(--color-line)]">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl text-[var(--color-text)] mb-2">
            Reservation Received!
          </h1>
          <p className="text-[var(--color-muted)]">
            We&apos;ve received your reservation. Check your email for
            confirmation.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Order Reference */}
        <div className="bg-dark-secondary rounded-xl border border-[var(--color-line)] p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-[var(--color-muted)]">
              Order Reference
            </span>
            <button
              className="text-gold-400 text-sm hover:text-gold-300"
              onClick={() => {
                if (typeof navigator !== "undefined") {
                  navigator.clipboard.writeText(orderId);
                }
              }}
            >
              Copy
            </button>
          </div>
          <p className="font-mono text-xl md:text-2xl text-gold-400 break-all">
            {orderId}
          </p>
        </div>

        {/* Coin Details */}
        {coin && (
          <div className="bg-dark-secondary rounded-xl border border-[var(--color-line)] p-6 mb-6">
            <h2 className="font-playfair text-lg text-[var(--color-text)] mb-4">
              Reserved Item
            </h2>
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-lg bg-dark-elevated overflow-hidden flex-shrink-0">
                <img
                  src={coin.images.obverse}
                  alt={coin.shortName}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="text-[var(--color-text)] font-medium">
                  {coin.name}
                </p>
                <p className="text-sm text-[var(--color-muted)]">
                  Grade: {coin.grade}
                </p>
                <p className="text-gold-400 font-mono text-lg mt-2">
                  {coin.price > 0
                    ? `$${coin.price.toLocaleString()}`
                    : coin.priceType === "call"
                      ? "Call for Price"
                      : "Spot + Premium"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Instructions */}
        <div className="bg-dark-secondary rounded-xl border border-gold-400/30 p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-gold-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-playfair text-lg text-gold-400 mb-2">
                Next Steps
              </h2>
              <ol className="space-y-3 text-[var(--color-muted)]">
                <li className="flex gap-3">
                  <span className="text-gold-400 font-mono">1.</span>
                  <span>
                    Check your email for detailed wire transfer instructions
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold-400 font-mono">2.</span>
                  <span>
                    Include your order reference{" "}
                    <span className="font-mono text-gold-400">{orderId}</span>{" "}
                    in the wire memo
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold-400 font-mono">3.</span>
                  <span>Complete payment within 72 hours to secure your coin</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold-400 font-mono">4.</span>
                  <span>
                    Once payment clears, your coin ships within 48 hours (fully
                    insured)
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Payment Deadline */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="font-semibold text-yellow-400">Payment Deadline</h3>
          </div>
          <p className="text-[var(--color-text)]">{deadlineStr}</p>
          <p className="text-sm text-[var(--color-muted)] mt-2">
            Your coin is reserved for 72 hours. If payment is not received by
            this time, the reservation will be released and the coin may be sold
            to another buyer.
          </p>
        </div>

        {/* Wire Transfer Preview */}
        <div className="bg-dark-secondary rounded-xl border border-[var(--color-line)] p-6 mb-6">
          <h2 className="font-playfair text-lg text-[var(--color-text)] mb-4">
            Wire Transfer Information
          </h2>
          <p className="text-[var(--color-muted)] mb-4">
            Detailed wire instructions have been sent to your email. For
            security, complete banking details are not displayed here.
          </p>
          <div className="bg-dark-elevated rounded-lg p-4 font-mono text-sm">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-[var(--color-muted)]">Bank:</span>
              <span className="text-[var(--color-text)]">
                [See email for details]
              </span>
              <span className="text-[var(--color-muted)]">Account Name:</span>
              <span className="text-[var(--color-text)]">Bache & Co.</span>
              <span className="text-[var(--color-muted)]">Reference:</span>
              <span className="text-gold-400">{orderId}</span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <TrustBadges className="mb-8" />

        {/* Contact & Actions */}
        <div className="text-center space-y-4">
          <p className="text-[var(--color-muted)]">
            Questions about your order? Contact us at{" "}
            <a
              href="mailto:nick@itprodirect.com"
              className="text-gold-400 hover:text-gold-300"
            >
              nick@itprodirect.com
            </a>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="
                inline-block px-6 py-3 rounded-lg font-medium
                bg-dark-secondary border border-[var(--color-line)]
                text-[var(--color-text)] hover:border-gold-400/30
                transition-colors
              "
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="
                inline-block px-6 py-3 rounded-lg font-medium
                bg-gold-gradient text-dark-primary
                hover:shadow-gold
                transition-all
              "
            >
              Return Home
            </Link>
          </div>
        </div>

        {/* Print-friendly note */}
        <p className="text-center text-xs text-[var(--color-muted)] mt-8">
          Save this page for your records. A copy has been sent to your email.
        </p>
      </div>
    </div>
  );
}
