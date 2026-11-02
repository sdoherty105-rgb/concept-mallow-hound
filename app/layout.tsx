import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConceptBanner } from "@/components/ConceptBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const display = localFont({
  src: "./fonts/BricolageGrotesque-latin.woff2",
  weight: "200 800",
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Arial",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
});

const body = localFont({
  src: "./fonts/AtkinsonHyperlegibleNext-latin.woff2",
  weight: "200 800",
  variable: "--font-body",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  title: {
    default: "Mallow Hound | The groom comes to you (fictional concept)",
    template: "%s | Mallow Hound",
  },
  description:
    "A fictional mobile dog grooming van for the Perth area. An OFF/SHIFT Studio concept: a scroll route with colour-block stops. Not a real business.",
  robots: { index: false, follow: false, nocache: true },
  applicationName: "Mallow Hound",
};

export const viewport: Viewport = {
  themeColor: "#FFF9EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`} data-accent="cobalt">
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
