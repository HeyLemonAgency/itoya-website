import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import { media } from "@/content/media";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookingBar } from "@/components/layout/MobileBookingBar";
import { RestaurantJsonLd } from "@/components/seo/RestaurantJsonLd";

// Self-hosted from @fontsource (OFL-1.1); latin subset covers French fully.
const serif = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

const sans = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  adjustFontFallback: "Arial",
});

const indexable = process.env.SITE_INDEXABLE === "true";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? site.url),
  title: {
    default: "Itoya — Restaurant japonais à Crissier",
    template: "%s · Itoya, restaurant japonais à Crissier",
  },
  description:
    "Sushis, sashimis, teppanyaki et menus dégustation midi et soir, sous une canopée de fleurs de cerisier. Itoya, Chemin des Lentillières 7A à Crissier.",
  applicationName: "Itoya",
  robots: indexable
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    siteName: "Itoya Crissier",
    images: [{ url: media.share.src, width: 1200, height: 630, alt: media.share.alt }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#141612",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CH" className={`${serif.variable} ${sans.variable}`}>
      <head>
        {/* Without JavaScript, reveal animations must never hide content. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#contenu"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-[2px] bg-ivory px-5 py-3 text-[0.8125rem] font-semibold text-ink shadow-lg transition-transform focus:translate-y-0"
        >
          Aller au contenu
        </a>
        <MotionProvider>
          <Header />
          <main id="contenu" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <MobileBookingBar />
        </MotionProvider>
        <RestaurantJsonLd />
      </body>
    </html>
  );
}
