import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: "var(--color-accent)" }}
        >
          Raw BU Silver Dollars
        </h1>
        <p
          className="text-xl mb-8 max-w-2xl mx-auto"
          style={{ color: "var(--color-muted)" }}
        >
          Morgan and Peace silver dollars at transparent, spot-based pricing.
          No games, no gimmicks.
        </p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3 rounded-lg font-semibold transition-colors"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-bg)",
          }}
        >
          Shop Now
        </Link>
      </section>

      {/* Spot Price Banner */}
      <section
        className="rounded-lg p-6 mb-12 text-center border"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-line)",
        }}
      >
        <p className="text-sm mb-1" style={{ color: "var(--color-muted)" }}>
          Silver Spot Price
        </p>
        <p className="text-3xl font-bold" style={{ color: "var(--color-text)" }}>
          $90.00 <span className="text-sm font-normal" style={{ color: "var(--color-muted)" }}>/oz</span>
        </p>
        <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>
          Fallback price shown. Live pricing coming soon.
        </p>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2
          className="text-2xl font-bold mb-8 text-center"
          style={{ color: "var(--color-text)" }}
        >
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Browse & Select",
              description: "Choose from our selection of raw BU Morgan and Peace dollars.",
            },
            {
              step: "2",
              title: "Submit Reservation",
              description: "Fill out our order form. We'll confirm availability and total.",
            },
            {
              step: "3",
              title: "Wire Payment",
              description: "Complete payment via wire/ACH. We ship once funds clear.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-lg border text-center"
              style={{
                backgroundColor: "var(--color-card)",
                borderColor: "var(--color-line)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-bg)",
                }}
              >
                {item.step}
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Wire Transfer Notice */}
      <section
        className="rounded-lg p-6 border text-center"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-accent)",
        }}
      >
        <h3 className="font-semibold mb-2" style={{ color: "var(--color-accent)" }}>
          Wire/ACH Payments Only
        </h3>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          To keep prices low and reduce fraud risk, we currently accept only wire and ACH
          bank transfers. Credit card payments may be available for established customers
          in the future.
        </p>
      </section>
    </div>
  );
}
