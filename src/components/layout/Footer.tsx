import Link from "next/link";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "nick@itprodirect.com";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-auto"
      style={{
        backgroundColor: "var(--color-card)",
        borderColor: "var(--color-line)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3
              className="text-lg font-bold mb-2"
              style={{ color: "var(--color-accent)" }}
            >
              Bache & Co.
            </h3>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              Premium BU Morgan and Peace silver dollars at transparent
              spot-based pricing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3" style={{ color: "var(--color-text)" }}>
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--color-muted)" }}>
              <li>
                <Link href="/shop" className="hover:underline">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:underline">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="font-semibold mb-3" style={{ color: "var(--color-text)" }}>
              Contact & Legal
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--color-muted)" }}>
              <li>
                <a href={`mailto:${contactEmail}`} className="hover:underline">
                  {contactEmail}
                </a>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-8 pt-4 border-t text-center text-sm"
          style={{
            borderColor: "var(--color-line)",
            color: "var(--color-muted)",
          }}
        >
          &copy; {currentYear} Bache & Co. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
