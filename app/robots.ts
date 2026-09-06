import type { MetadataRoute } from 'next';

import { siteMetadata } from '@/app/data/siteMetadata';

export const dynamic = 'force-static';

const blockedTrainingAndScraperBots = [
  'GPTBot',
  'Google-Extended',
  'ClaudeBot',
  'anthropic-ai',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'meta-externalagent',
  'cohere-ai',
  'Diffbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: blockedTrainingAndScraperBots,
        disallow: '/',
      },
      // Keep search engines and user-initiated fetchers discoverable by default.
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${siteMetadata.url}/sitemap.xml`,
  };
}
