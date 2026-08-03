import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local';

import '@/styles/global.css';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Dock from "@/components/layout/Dock";
import InitialLoader from '@/components/InitialLoader';
import ThemeToggle from '@/components/ThemeToggle';

// 1. Initialize Inter (Using a variable font file if available)
const Inter = localFont({
  src: "./fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter", // Exposes the CSS variable
  display: "swap",
});

// 2. Initialize Inter (Using a variable font file if available)
const Nohemi = localFont({
  src: "./fonts/Nohemi-VF.ttf",
  variable: "--font-nohemi", // Exposes the CSS variable
  display: "swap",
});

// 2. Initialize Geist Pixel
const geistPixel = localFont({
  src: "./fonts/GeistPixel-Regular-VariableFont_ELSH.ttf",
  variable: "--font-geist-pixel",
  display: "swap",
});

// This is the crucial part for mobile scaling
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Optional: prevents "accidental zoom" on inputs
}

export const metadata: Metadata = {
  metadataBase: new URL('https://jaywong.digital/'), // Change to your actual URL
  alternates: {
    canonical: '/',  // ← adds <link rel="canonical" href="https://jaywong.digital/">
  },
  title: {
    default: "Jay Wong",
    template: "%s | Jay Wong",  // ← page titles become e.g. "Case Study | Jay Wong"
  },
  description: "👋 a product designer that operates at the crossroads of design, engineering, and business.",
  
  // This handles your Facebook/OpenGraph tags
  openGraph: {
    title: "Jay Wong",
    description: "👋 a product designer that operates at the crossroads of design, engineering, and business.",
    url: "https://jaywong.digital/",
    siteName: "Jay Wong",
    images: [{ url: "/assets/images/OG-Image.png" }],
    type: "website",
  },

  // This handles your Twitter tags
  twitter: {
    card: "summary_large_image",
    title: "Jay Wong – Solving digital complexity with design",
    images: ["/assets/images/OG-Image.png"],
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
    
    <html lang="en" className={`${Inter.variable} ${geistPixel.variable}`}>
      <head>
        {/* Google Material Symbols Link */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" 
        />
      </head>
      
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
