import type { Metadata } from 'next';

import type { CaseStudy } from '@/app/data/caseStudies';
import { heroContent } from '@/app/data/heroContent';

const siteName = 'Jay Wong';

export const siteMetadata = {
  name: siteName,
  homepageTitle: `${siteName} | Product Designer`,
  titleTemplate: `%s | ${siteName}`,
  // Match the GitHub Pages CNAME so crawlers can fetch metadata and assets
  // without crossing the apex-to-www redirect.
  url: 'https://www.jaywong.digital',
  socialImage: {
    url: '/opengraph-image.png',
    width: 1200,
    height: 630,
    type: 'image/png',
    // Social preview images are raster content. This text gives screen-reader
    // users the same identity and location information shown in the artwork.
    alt: 'Jay Wong — Product Designer in Dubai, United Arab Emirates.',
  },
  // The Hero tagline remains the single source of truth for the site description.
  description: heroContent.tagline,
} as const;

export function formatPageTitle(title: string) {
  return siteMetadata.titleTemplate.replace('%s', title);
}

export function createCaseStudyMetadata(project: CaseStudy): Metadata {
  const pathname = `/${project.slug}`;
  const socialTitle = formatPageTitle(project.title);
  const image = {
    url: project.bentoImage,
    alt: `${project.title} case study by ${siteMetadata.name}`,
  };

  return {
    title: project.title,
    description: project.tagline,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: socialTitle,
      description: project.tagline,
      url: pathname,
      siteName: siteMetadata.name,
      images: [image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: project.tagline,
      images: [image],
    },
  };
}
