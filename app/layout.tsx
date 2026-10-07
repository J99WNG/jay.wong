import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local';

import '@/styles/global.css';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import InitialLoader from '@/components/layout/InitialLoader';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { siteMetadata } from '@/content/siteMetadata';

const geistSans = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  display: "swap",
  weight: "100 900",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: false,
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "100 900",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: false,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  alternates: {
    canonical: '/',
  },
  title: {
    default: siteMetadata.homepageTitle,
    template: siteMetadata.titleTemplate,
  },
  description: siteMetadata.description,
  
  // This handles your Facebook/OpenGraph tags
  openGraph: {
    title: siteMetadata.homepageTitle,
    description: siteMetadata.description,
    url: siteMetadata.url,
    siteName: siteMetadata.name,
    // Use an extension-bearing static asset so strict preview clients such as
    // Messages receive `image/png` instead of `application/octet-stream`.
    images: [siteMetadata.socialImage],
    type: "website",
  },

  // This handles your Twitter tags
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.homepageTitle,
    description: siteMetadata.description,
    images: [siteMetadata.socialImage],
  },

  // Site icons are separate from the large OG artwork. The SVG responds to the
  // OS theme; PNG pairs cover browsers that support media-aware icon links; ICO
  // and Apple touch icons remain high-contrast fallbacks for older clients.
  icons: {
    icon: [
      { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      {
        url: "/favicon-light.png",
        sizes: "512x512",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.png",
        sizes: "512x512",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      { url: "/favicon.ico", sizes: "256x256", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }:
  Readonly<{ children: React.ReactNode; }>) {
  return (
    
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="relative">
        <InitialLoader>
          <Header /> 
          
          {children}

          {/* Global utilities share one position and stack independently of page navigation. */}
          <div
            className="fixed right-4 bottom-4 z-(--layer-utility) flex flex-col items-end gap-3"
            role="group"
            aria-label="Page utilities"
          >
            <BackToTop />
            <ThemeToggle />
          </div>
          
          <Footer />
        </InitialLoader>
      </body>
    </html>
  );
}
