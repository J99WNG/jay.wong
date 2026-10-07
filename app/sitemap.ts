import type { MetadataRoute } from 'next';

import { caseStudies } from '@/content/caseStudies';
import { siteMetadata } from '@/content/siteMetadata';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // Only advertise case studies marked as available in the shared project data.
  const caseStudyRoutes = caseStudies
    .filter((project) => project.available)
    .map((project) => ({
      url: `${siteMetadata.url}/${project.slug}`,
    }));

  return [{ url: siteMetadata.url }, ...caseStudyRoutes];
}
