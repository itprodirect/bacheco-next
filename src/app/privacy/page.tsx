import type { Metadata } from "next";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "nick@itprodirect.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Bache & Co.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Privacy Policy
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
            1. Information We Collect
          </h2>
          <p className="mb-3">
            When you use our services, we may collect the following information:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong style={{ color: "var(--color-text)" }}>
                Contact Information:
              </strong>{" "}
              Name, email address, phone number, and shipping address provided
              when placing orders or contacting us.
            </li>
            <li>
              <strong style={{ color: "var(--color-text)" }}>
                Order Information:
              </strong>{" "}
              Products ordered, quantities, payment confirmation, and
              transaction history.
            </li>
            <li>
              <strong style={{ color: "var(--color-text)" }}>
                Usage Data:
              </strong>{" "}
              Basic analytics about how you interact with our website (pages
              visited, time on site).
            </li>
          </ul>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            2. How We Use Your Information
          </h2>
          <p className="mb-3">We use your information to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about orders, shipping, and support</li>
            <li>Send payment instructions and order confirmations</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            3. Information Sharing
          </h2>
          <p className="mb-3">
            We do not sell, rent, or trade your personal information. We may
            share your information only in the following circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong style={{ color: "var(--color-text)" }}>
                Shipping Partners:
              </strong>{" "}
              We share shipping addresses with carriers (USPS, etc.) to deliver
              your orders.
            </li>
            <li>
              <strong style={{ color: "var(--color-text)" }}>
                Legal Requirements:
              </strong>{" "}
              We may disclose information if required by law or to protect our
              rights.
            </li>
          </ul>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            4. Data Security
          </h2>
          <p>
            We implement reasonable security measures to protect your information.
            However, no method of transmission over the internet is 100% secure.
            We do not store banking information — wire/ACH details are provided
            to you for one-time use and are not retained on our systems.
          </p>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            5. Cookies and Tracking
          </h2>
          <p>
            Our website may use cookies to remember your preferences (such as
            dark/light mode) and for basic analytics. You can control cookie
            settings through your browser. We do not use cookies for advertising
            or cross-site tracking.
          </p>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            6. Data Retention
          </h2>
          <p>
            We retain order records for accounting and legal purposes. Contact
            form submissions are retained only as long as necessary to respond to
            your inquiry. You may request deletion of your data by contacting us.
          </p>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            7. Your Rights
          </h2>
          <p className="mb-3">You have the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Request access to the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information (subject to legal retention requirements)</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            8. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            9. Contact
          </h2>
          <p>
            For questions about this Privacy Policy or your data, please contact
            us at{" "}
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
