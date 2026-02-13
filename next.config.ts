import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  output: 'export', // Required for GitHub Pages
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true
};

const dishesMDX = createMDX({
  // Add markdown plugins here if needed
})

export default nextConfig;