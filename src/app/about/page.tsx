import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Bache & Co. and our mission to provide quality silver dollars at fair, transparent pricing.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--color-text)" }}
        >
          About Bache & Co.
        </h1>
        <p style={{ color: "var(--color-muted)" }}>
          Quality silver dollars at fair, transparent pricing
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Mission */}
        <section
          className="rounded-lg border p-6"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-line)",
          }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--color-accent)" }}
          >
            Our Mission
          </h2>
          <p className="mb-4" style={{ color: "var(--color-muted)" }}>
            At Bache & Co., we believe buying silver shouldn&apos;t be complicated.
            We offer raw Brilliant Uncirculated Morgan and Peace dollars at
            straightforward, spot-based pricing with clear volume discounts.
          </p>
          <p style={{ color: "var(--color-muted)" }}>
            No confusing premiums, no hidden fees, no games. Just quality coins
            at fair prices.
          </p>
        </section>

        {/* Why Us */}
        <section
          className="rounded-lg border p-6"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-line)",
          }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--color-accent)" }}
          >
            Why Choose Us
          </h2>
          <ul className="space-y-3" style={{ color: "var(--color-muted)" }}>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--color-accent)" }}>✓</span>
              <span>
                <strong style={{ color: "var(--color-text)" }}>
                  Transparent Pricing
                </strong>{" "}
                — Our formula is simple: spot price × silver content + premium.
                No surprises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--color-accent)" }}>✓</span>
              <span>
                <strong style={{ color: "var(--color-text)" }}>
                  Volume Discounts
                </strong>{" "}
                — Buy more, pay less. Premiums drop as quantity increases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--color-accent)" }}>✓</span>
              <span>
                <strong style={{ color: "var(--color-text)" }}>
                  Quality Coins
                </strong>{" "}
                — We specialize in raw BU (Brilliant Uncirculated) Morgan and
                Peace dollars.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--color-accent)" }}>✓</span>
              <span>
                <strong style={{ color: "var(--color-text)" }}>
                  Secure Transactions
                </strong>{" "}
                — Wire/ACH payments protect both parties from fraud and
                chargebacks.
              </span>
            </li>
          </ul>
        </section>

        {/* Our Process */}
        <section
          className="rounded-lg border p-6"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-line)",
          }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--color-accent)" }}
          >
            How It Works
          </h2>
          <ol className="space-y-4" style={{ color: "var(--color-muted)" }}>
            <li className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-bg)",
                }}
              >
                1
              </span>
              <span>
                <strong style={{ color: "var(--color-text)" }}>Browse & Select</strong>{" "}
                — Choose your coins and quantity on our shop page.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-bg)",
                }}
              >
                2
              </span>
              <span>
                <strong style={{ color: "var(--color-text)" }}>Reserve</strong>{" "}
                — Submit an order form. We&apos;ll confirm availability and send
                payment details.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-bg)",
                }}
              >
                3
              </span>
              <span>
                <strong style={{ color: "var(--color-text)" }}>Pay</strong>{" "}
                — Send payment via wire or ACH. Your price locks when we confirm
                receipt.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-bg)",
                }}
              >
                4
              </span>
              <span>
                <strong style={{ color: "var(--color-text)" }}>Receive</strong>{" "}
                — We ship your coins securely, typically within 2-3 business days.
              </span>
            </li>
          </ol>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/shop"
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-colors"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-bg)",
            }}
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
