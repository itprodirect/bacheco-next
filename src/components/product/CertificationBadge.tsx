import type { Certification } from "@/types/coin";

interface CertificationBadgeProps {
  certification: Certification;
  showVerifyLink?: boolean;
  size?: "sm" | "md";
}

const serviceStyles: Record<string, string> = {
  PCGS: "bg-blue-600 text-white",
  NGC: "bg-purple-600 text-white",
  ANACS: "bg-green-600 text-white",
  ICG: "bg-orange-600 text-white",
  raw: "bg-gray-600 text-white",
};

const serviceLabels: Record<string, string> = {
  PCGS: "PCGS",
  NGC: "NGC",
  ANACS: "ANACS",
  ICG: "ICG",
  raw: "Raw",
};

export function CertificationBadge({
  certification,
  showVerifyLink = false,
  size = "md",
}: CertificationBadgeProps) {
  const { service, grade, certNumber, verifyUrl, designation } = certification;

  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-xs px-2 py-0.5",
  };

  const content = (
    <div
      className={`
      inline-flex items-center gap-2
      bg-dark-elevated rounded-lg
      border border-[var(--color-line)]
      ${size === "sm" ? "px-2 py-1" : "px-3 py-1.5"}
    `}
    >
      {/* Service Badge */}
      <span
        className={`
        ${serviceStyles[service] || serviceStyles.raw}
        ${sizeClasses[size]}
        font-bold rounded uppercase tracking-wide
      `}
      >
        {serviceLabels[service] || service}
      </span>

      {/* Grade */}
      <span
        className={`font-mono text-[var(--color-text)] font-semibold ${size === "sm" ? "text-sm" : "text-base"}`}
      >
        {grade}
      </span>

      {/* Designation (CAC, Plus, etc.) */}
      {designation && (
        <span className="text-xs text-gold-400 font-medium">{designation}</span>
      )}

      {/* Cert Number */}
      {certNumber && size === "md" && (
        <span className="font-mono text-[var(--color-muted)] text-xs">
          #{certNumber}
        </span>
      )}
    </div>
  );

  // Wrap in link if verify URL provided and showVerifyLink is true
  if (showVerifyLink && verifyUrl) {
    return (
      <a
        href={verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {content}
        <span className="text-xs text-gold-400 hover:text-gold-300">
          Verify &rarr;
        </span>
      </a>
    );
  }

  return content;
}
