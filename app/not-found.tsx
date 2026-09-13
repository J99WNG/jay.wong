import type { Metadata } from 'next';

import { formatPageTitle, siteMetadata } from '@/app/data/siteMetadata';
import NotFoundContent from '@/app/NotFoundContent';

const title = '404 Page not found';
const description = 'This page may have moved or no longer exists. Return to Jay Wong’s product design portfolio.';

// Next requires this file at the root of `app` to replace its global 404 UI.
// The animated client component remains separate so this route can own metadata.
export const metadata: Metadata = {
  title,
  description,
  // A missing URL must not inherit the homepage canonical from the root layout;
  // that would incorrectly describe every broken URL as a copy of the homepage.
  alternates: {
    canonical: null,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: formatPageTitle(title),
    description,
    siteName: siteMetadata.name,
    images: [siteMetadata.socialImage],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: formatPageTitle(title),
    description,
    images: [siteMetadata.socialImage],
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}
