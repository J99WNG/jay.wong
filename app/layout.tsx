import type { Metadata } from "next";
import { Inter } from "next/font/google";

import '../styles/colour-system.css';
import '../styles/typography.css';
import '../styles/iconography.css';
import '../styles/globals.css'; // Main styles last

import Header from "../components/Header";
import Footer from "../components/Footer";
import Dock from "../components/Dock";
import FadeObserver from '@/components/FadeObserver';

// Configure the font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', 
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jaywong.digital/'), // Change to your actual URL
  title: "Jay Wong – Solving digital complexity with design",
  description: "👋 I'm Jay – a product and front-end designer specialising in inclusive, AI-led and service-driven products.",
  
  // This handles your Facebook/OpenGraph tags
  openGraph: {
    title: "Jay Wong – Solving digital complexity with design",
    description: "👋 I'm Jay – a product and front-end designer...",
    url: "https://www.jaywong.digital/",
    siteName: "JW Portfolio",
    images: [{ url: "/assets/images/OG-Image.png" }], // No {{ site.baseurl }} needed!
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
    icon: "/assets/images/favicon.svg",
    apple: [
      { url: "/assets/images/favicon.svg" },
      { url: "/assets/images/favicon.svg", sizes: "76x76" },
      { url: "/assets/images/favicon.svg", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({ children }:
  Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Google Material Symbols Link */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" 
        />
      </head>
      
      <body>
        <Header /> 

        <FadeObserver /> {/* Handles all section animations */}
        <main id="main">
          {children}
        </main>

        <Dock />

        <Footer />
      </body>
    </html>
  );
}
