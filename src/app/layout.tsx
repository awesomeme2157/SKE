import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollEffects } from "@/components/scroll-effects";
import localFont from "next/font/local";
import "./globals.css";
import "./visual-refresh.css";

const bodyFont = localFont({ src: "./fonts/dm_sans_latin.woff2", variable: "--font-body", weight: "400 700", display: "swap" });
const headingFont = localFont({ src: "./fonts/manrope_latin.woff2", variable: "--font-heading", weight: "400 700", display: "swap" });

export const metadata: Metadata = {
  title: "Shree Krishnna Enterprises",
  description: "Textile machinery, accessories, and technical consultancy from Shree Krishnna Enterprises.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <ScrollEffects />
      </body>
    </html>
  );
}
