import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bache & Co. | Raw BU Morgan & Peace Silver Dollars",
    template: "%s | Bache & Co.",
  },
  description:
    "Premium BU Morgan and Peace silver dollars at transparent spot-based pricing. Wire/bank transfer orders. Competitive premiums.",
  keywords: [
    "Morgan dollars",
    "Peace dollars",
    "silver coins",
    "BU silver",
    "bullion",
  ],
  openGraph: {
    title: "Bache & Co. | Silver Dollar Specialists",
    description:
      "Premium BU Morgan and Peace silver dollars at transparent spot-based pricing.",
    url: "https://bacheco.vercel.app",
    siteName: "Bache & Co.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-inter min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
