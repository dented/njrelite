import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import SiteHeader from "@/components/shared/SiteHeader";
import SiteFooter from "@/components/shared/SiteFooter";
import ParallaxClient from "@/components/ParallaxClient";
import RevealClient from "@/components/RevealClient";

export const metadata: Metadata = {
  title: "Niagara Jr Elite - Junior Hockey Team",
  description:
    "Niagara Jr Elite is a junior elite ice hockey team competing in tournaments across Canada. View the roster, legacy, and support the team.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#FF0000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="android-chrome-192x192-icon" href="/images/android-chrome-192x192.png" />
        <link rel="android-chrome-512x512-icon" href="/images/android-chrome-512x512.png" />
        <link rel="android-chrome-mask-icon" href="/images/safari-pinned-tab.svg" color="#FF0000" />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />

        <SiteHeader />
        <ParallaxClient />
        <RevealClient />

        {children}

        <SiteFooter />
      </body>
    </html>
  );
}

export default RootLayout;