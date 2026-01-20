import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about buying silver dollars from Bache & Co.",
};

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We currently accept wire transfers and ACH bank transfers only. This helps us keep prices low and protects both parties from fraud. Credit card payments may be available for established customers in the future.",
  },
  {
    question: "How does your pricing work?",
    answer:
      "Our prices are based on the current silver spot price multiplied by the coin's silver content (0.77344 oz for Morgan and Peace dollars), plus a premium that decreases with quantity. See our Pricing page for the full breakdown.",
  },
  {
    question: "When is my price locked in?",
    answer:
      "Your price is locked once we confirm receipt of your wire/ACH payment. Spot price fluctuations between your order submission and payment are at your risk, so we recommend prompt payment.",
  },
  {
    question: "What condition are the coins in?",
    answer:
      "We sell raw (unslabbed) Brilliant Uncirculated (BU) coins. These are original, uncirculated coins that have never been in general circulation. They are not professionally graded.",
  },
  {
    question: "Can I request specific dates or mint marks?",
    answer:
      "For common date purchases, dates and mint marks are our choice based on current inventory. If you need specific dates or mint marks, please contact us to discuss availability and any additional premiums.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Orders typically ship within 2-3 business days after payment clears. Domestic shipping is via USPS Priority Mail with insurance. International shipping is available upon request.",
  },
  {
    question: "Do you offer returns?",
    answer:
      "Due to the nature of precious metals and price volatility, all sales are final once payment is received. Please review your order carefully before submitting. If there's an issue with your order (wrong items, damage, etc.), contact us immediately.",
  },
  {
    question: "What's the difference between raw and slabbed coins?",
    answer:
      "Raw coins are loose/ungraded, while slabbed coins have been professionally graded and encapsulated by services like PCGS or NGC. We sell raw BU coins, which typically offer better value for bullion-focused buyers.",
  },
  {
    question: "Why wire/ACH instead of credit cards?",
    answer:
      "Wire and ACH transfers are irreversible, which eliminates chargeback fraud risk. This allows us to offer lower premiums. It also protects you from potential credit card data breaches.",
  },
  {
    question: "How do I contact you with more questions?",
    answer:
      "You can reach us via our Contact page or email us directly. We typically respond within 1-2 business days.",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Frequently Asked Questions
        </h1>
        <p style={{ color: "var(--color-muted)" }}>
          Common questions about buying silver dollars from Bache & Co.
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-lg border"
            style={{
              backgroundColor: "var(--color-card)",
              borderColor: "var(--color-line)",
            }}
          >
            <summary
              className="flex items-center justify-between p-4 cursor-pointer list-none"
              style={{ color: "var(--color-text)" }}
            >
              <span className="font-medium pr-4">{faq.question}</span>
              <span
                className="flex-shrink-0 transition-transform group-open:rotate-180"
                style={{ color: "var(--color-accent)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>
            <div
              className="px-4 pb-4"
              style={{ color: "var(--color-muted)" }}
            >
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>

      {/* Contact CTA */}
      <div
        className="mt-12 rounded-lg border p-6 text-center"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-line)",
        }}
      >
        <h2
          className="font-semibold mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Still have questions?
        </h2>
        <p className="mb-4" style={{ color: "var(--color-muted)" }}>
          We&apos;re here to help. Reach out and we&apos;ll get back to you.
        </p>
        <Link
          href="/contact"
          className="inline-block px-6 py-2 rounded-lg font-medium transition-colors"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-bg)",
          }}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
