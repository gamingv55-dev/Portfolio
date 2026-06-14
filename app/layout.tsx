/**
 * ROOT LAYOUT — SEO метаданни, шрифтове, глобален фон и cursor glow.
 * Шрифтове: Space Grotesk (display) + Inter (body) — premium tech усещане.
 */
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/content";
import CursorGlow from "@/components/ui/CursorGlow";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://your-domain.com"; // PLACEHOLDER: сложи реалния домейн

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} — Уебсайтове, които печелят клиенти`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Изработка на премиум уебсайтове за бизнеси — бързи, убедителни и оптимизирани за повече запитвания. Дизайн, скорост, SEO и UX, които водят до резултат.",
  keywords: [
    "изработка на уебсайт",
    "уеб дизайн",
    "сайт за бизнес",
    "Next.js разработка",
    "премиум уебсайт",
    "SEO оптимизация",
  ],
  authors: [{ name: brand.name }],
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: siteUrl,
    siteName: brand.name,
    title: `${brand.name} — Уебсайтове, които печелят клиенти`,
    description:
      "Премиум уебсайтове за бизнеси — бързи, убедителни и оптимизирани за повече запитвания.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — Уебсайтове, които печелят клиенти`,
    description: "Премиум уебсайтове за бизнеси, които превръщат вниманието в клиенти.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06060a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
