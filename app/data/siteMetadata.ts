import type { Metadata } from 'next';

import type { CaseStudy } from '@/app/data/caseStudies';
import { heroContent } from '@/app/data/heroContent';

const siteName = 'Jay Wong';

export const siteMetadata = {
  name: siteName,
  homepageTitle: `${siteName} | Product Designer`,
  titleTemplate: `%s | ${siteName}`,
  url: 'https://jaywong.digital',
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
