import type { Metadata } from "next";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "nick@itprodirect.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Bache & Co.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Terms of Service
        </h1>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          Last updated: January 19, 2026
        </p>
      </div>

      {/* Content */}
      <div
        className="prose max-w-none space-y-6"
        style={{ color: "var(--color-muted)" }}
      >
        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using the Bache & Co. website and services, you agree
            to be bound by these Terms of Service. If you do not agree to these
            terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            2. Products and Pricing
          </h2>
          <p className="mb-3">
            We sell raw Brilliant Uncirculated (BU) Morgan and Peace silver
            dollars. Our prices are based on the current silver spot price plus a
            premium that varies by quantity ordered.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Prices displayed are estimates based on the current spot price and
              may change before payment is received.
            </li>
            <li>
              Your final price is locked when we confirm receipt of your wire/ACH
              payment.
            </li>
            <li>
              Coin dates and mint marks for common date orders are our choice
              based on inventory.
            </li>
          </ul>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            3. Orders and Payment
          </h2>
          <p className="mb-3">
            Submitting an order form constitutes a reservation, not a binding
            purchase. Orders become binding upon our confirmation and your
            payment.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              We accept wire transfers and ACH bank transfers only. No credit
              cards, PayPal, or cryptocurrency.
            </li>
            <li>
              Payment must be received within 48-72 hours of order confirmation,
              unless otherwise arranged.
            </li>
            <li>
              We reserve the right to cancel orders if payment is not received
              within the specified timeframe.
            </li>
          </ul>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            4. Shipping and Delivery
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Orders ship within 2-3 business days after payment clears.
            </li>
            <li>
              Domestic orders ship via USPS Priority Mail with insurance.
            </li>
            <li>
              Risk of loss transfers to the buyer upon delivery to the carrier.
            </li>
            <li>
              International shipping is available upon request and subject to
              additional fees.
            </li>
          </ul>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            5. Returns and Refunds
          </h2>
          <p className="mb-3">
            Due to the volatile nature of precious metals pricing, all sales are
            final once payment is received.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              If you receive incorrect items or damaged goods, contact us
              immediately with photos.
            </li>
            <li>
              Claims must be made within 48 hours of delivery.
            </li>
            <li>
              Refunds for legitimate claims will be processed at our discretion.
            </li>
          </ul>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            6. Limitation of Liability
          </h2>
          <p>
            Bache & Co. shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of our
            services or products. Our total liability shall not exceed the amount
            paid for the specific products in question.
          </p>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            7. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting. Your continued use of our
            services constitutes acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            8. Contact
          </h2>
          <p>
            For questions about these Terms of Service, please contact us at{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="underline"
              style={{ color: "var(--color-accent)" }}
            >
              {contactEmail}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
