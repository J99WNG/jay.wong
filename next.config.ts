import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  output: 'export', 
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true, 
  },
  trailingSlash: false,

  typescript: {
    ignoreBuildErrors: true,
  },
  // Optional: If your repo name is NOT 'jaywong.github.io' 
  // (e.g., it is 'portfolio-site'), you MUST add:
  // basePath: '/portfolio-site',
};

const withMDX = createMDX({});

// Wrap the config with MDX support
export default withMDX(nextConfig);