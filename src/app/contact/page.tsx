import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "nick@itprodirect.com";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Bache & Co. for questions about our silver dollars, pricing, or orders.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Contact Us
        </h1>
        <p style={{ color: "var(--color-muted)" }}>
          Have a question? We&apos;d love to hear from you.
        </p>
      </div>

      {/* Contact Info */}
      <div
        className="rounded-lg border p-6 mb-8"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-line)",
        }}
      >
        <h2
          className="font-semibold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Get In Touch
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
              style={{ color: "var(--color-accent)" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <a
              href={`mailto:${contactEmail}`}
              className="hover:underline"
              style={{ color: "var(--color-text)" }}
            >
              {contactEmail}
            </a>
          </div>
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            We typically respond within 1-2 business days.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-line)",
        }}
      >
        <h2
          className="font-semibold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Send a Message
        </h2>
        <ContactForm />
      </div>

      {/* FAQ Link */}
      <div className="mt-8 text-center">
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          Looking for quick answers?{" "}
          <a
            href="/faq"
            className="underline"
            style={{ color: "var(--color-accent)" }}
          >
            Check our FAQ
          </a>
        </p>
      </div>
    </div>
  );
}
