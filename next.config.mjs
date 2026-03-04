import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Ignore ESLint during production builds so lint warnings/errors
  // won't fail the build. This is intentional per production policy.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript build errors in production builds so `next build`
  // will succeed even if there are type errors. Use with caution.
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
      },
      {
        protocol: 'https',
        hostname: 'dev-to-uploads.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: 'adeloop.hashnode.dev',
      },
    ],
  },
};

export default withMDX(config);
