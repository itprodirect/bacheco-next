import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme backgrounds
        dark: {
          base: "#050709",
          primary: "#0a0d12",
          secondary: "#111827",
          elevated: "#1a202c",
          // Legacy aliases
          bg: "#0a0d12",
          card: "#111827",
          text: "#f7f8fa",
          muted: "#9ca3af",
          line: "#2d3748",
          accent: "#d4af37",
        },
        // Light theme
        light: {
          base: "#f5f5f4",
          primary: "#fafaf9",
          secondary: "#ffffff",
          elevated: "#ffffff",
          // Legacy aliases
          bg: "#fafaf9",
          card: "#ffffff",
          text: "#1a1a1a",
          muted: "#6b7280",
          line: "#e5e7eb",
          accent: "#b8860b",
        },
        // Gold palette for premium accents
        gold: {
          50: "#fef9e7",
          100: "#fcf0c3",
          200: "#f9e08a",
          300: "#f4d03f",
          400: "#d4af37",
          500: "#b8960b",
          600: "#9a7d0a",
          700: "#7c6408",
          800: "#5e4b06",
          900: "#3f3204",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Menlo", "monospace"],
      },
      fontSize: {
        display: ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h1: ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h2: ["2rem", { lineHeight: "1.25" }],
        h3: ["1.5rem", { lineHeight: "1.3" }],
        h4: ["1.25rem", { lineHeight: "1.4" }],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent, rgba(212,175,55,0.1), transparent)",
        "radial-gold": "radial-gradient(circle at center, rgba(212,175,55,0.03) 0%, transparent 70%)",
      },
      boxShadow: {
        gold: "0 0 20px rgba(212, 175, 55, 0.15)",
        "gold-lg": "0 0 40px rgba(212, 175, 55, 0.2)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
        "card-hover": "0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        shimmer: "shimmer 2s infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212, 175, 55, 0.4)" },
          "50%": { boxShadow: "0 0 0 10px rgba(212, 175, 55, 0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
