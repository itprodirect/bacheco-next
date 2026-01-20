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
        // Dark theme (default)
        dark: {
          bg: "#0b0f17",
          card: "#121a26",
          text: "#e8eef7",
          muted: "#93a4b8",
          line: "#223049",
          accent: "#d4b36a",
        },
        // Light theme
        light: {
          bg: "#f8fafc",
          card: "#ffffff",
          text: "#1e293b",
          muted: "#64748b",
          line: "#e2e8f0",
          accent: "#b8860b",
        },
      },
    },
  },
  plugins: [],
};

export default config;
