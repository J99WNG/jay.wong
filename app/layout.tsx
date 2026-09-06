import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local';

import '@/styles/global.css';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Dock from "@/components/layout/Dock";
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
    type: "website",
  },

  // This handles your Twitter tags
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.homepageTitle,
    description: siteMetadata.description,
  },

  // This handles icons and Apple Touch Icons
  icons: {
    icon: "/favicon.svg",
    apple: [
      { url: "/favicon.png" },
      { url: "/favicon.png", sizes: "76x76" },
      { url: "/favicon.png", sizes: "180x180" },
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
          
          <ThemeToggle />
          <Dock />
          <Footer />
        </InitialLoader>
      </body>
    </html>
  );
}
