import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local';

import '@/styles/global.css';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import InitialLoader from '@/components/InitialLoader';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { siteMetadata } from '@/app/data/siteMetadata';

// 1. Initialize Inter (Using a variable font file if available)
const Inter = localFont({
  src: "./fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter", // Exposes the CSS variable
  display: "swap",
});

// 2. Initialize Geist Pixel
const geistPixel = localFont({
  src: "./fonts/GeistPixel-Regular-VariableFont_ELSH.ttf",
  variable: "--font-geist-pixel",
  display: "swap",
  weight: "400",
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

  // Site icons are separate from the large OG artwork. Messaging apps choose
  // whether to show one; offering ICO, SVG, PNG and Apple variants gives older
  // crawlers and modern assistive platforms compatible options.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "256x256", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }:
  Readonly<{ children: React.ReactNode; }>) {
  return (
    
    <html
      lang="en"
      className={`${Inter.variable} ${geistPixel.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="relative">
        <InitialLoader>
          <Header /> 
          
          {children}
          
          <BackToTop />
          <ThemeToggle />
          
          <Footer />
        </InitialLoader>
      </body>
    </html>
  );
}
