import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  output: 'export',
  // Allow dev server when opened via Network URL or phone on LAN (not only localhost).
  // Add your LAN IP from `ipconfig getifaddr en0` if it differs from the Network line in the terminal.
  allowedDevOrigins: [
    '127.218.160.167',
    ...(process.env.ALLOWED_DEV_ORIGINS?.split(',').map((o) => o.trim()).filter(Boolean) ?? []),
  ],
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