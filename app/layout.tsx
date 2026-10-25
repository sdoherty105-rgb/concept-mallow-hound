import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConceptBanner } from "@/components/ConceptBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const display = localFont({
  src: "./fonts/NunitoSans-var.woff2",
  weight: "600 1000",
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: "./fonts/DMSans-var.woff2",
  weight: "400 700",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mallow Hound | Mobile dog grooming van, Perth (fictional concept)",
    template: "%s | Mallow Hound",
  },
  description:
    "A fictional mobile dog grooming van serving the Perth area. A concept website by OFF/SHIFT Studio, built to demonstrate design for a local service business.",
  robots: { index: false, follow: false, nocache: true },
  applicationName: "Mallow Hound",
};

export const viewport: Viewport = {
  themeColor: "#FFF7EB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <ConceptBanner />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
