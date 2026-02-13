import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Required for GitHub Pagess
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true,

  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;