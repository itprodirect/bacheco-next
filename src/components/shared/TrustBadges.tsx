import type { ReactNode } from "react";

interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

const badges: TrustBadge[] = [
  {
    icon: "shield",
    title: "100% Authentic",
    description: "Every coin guaranteed genuine",
  },
  {
    icon: "lock",
    title: "Secure Payment",
    description: "Bank wire transfers",
  },
  {
    icon: "truck",
    title: "Insured Shipping",
    description: "Fully insured delivery",
  },
  {
    icon: "refresh",
    title: "7-Day Returns",
    description: "Easy return policy",
  },
];

// Simple SVG icons
const icons: Record<string, ReactNode> = {
  shield: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  lock: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  ),
  truck: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      />
    </svg>
  ),
  refresh: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  ),
};

interface TrustBadgesProps {
  variant?: "horizontal" | "vertical" | "compact";
  className?: string;
}

export function TrustBadges({
  variant = "horizontal",
  className = "",
}: TrustBadgesProps) {
  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap gap-4 ${className}`}>
        {badges.map((badge) => (
          <div
            key={badge.title}
            className="flex items-center gap-2 text-[var(--color-muted)]"
          >
            <span className="text-gold-400">{icons[badge.icon]}</span>
            <span className="text-sm">{badge.title}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={`space-y-4 ${className}`}>
        {badges.map((badge) => (
          <div key={badge.title} className="flex items-start gap-3">
            <div className="text-gold-400 mt-0.5">{icons[badge.icon]}</div>
            <div>
              <h4 className="font-semibold text-[var(--color-text)] text-sm">
                {badge.title}
              </h4>
              <p className="text-[var(--color-muted)] text-xs">
                {badge.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: horizontal grid
  return (
    <div
      className={`
      grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6
      py-6 md:py-8
      border-y border-[var(--color-line)]
      ${className}
    `}
    >
      {badges.map((badge) => (
        <div key={badge.title} className="text-center">
          <div className="flex justify-center mb-2 text-gold-400">
            {icons[badge.icon]}
          </div>
          <h4 className="font-semibold text-[var(--color-text)] text-sm">
            {badge.title}
          </h4>
          <p className="text-[var(--color-muted)] text-xs mt-1">
            {badge.description}
          </p>
        </div>
      ))}
    </div>
  );
}
