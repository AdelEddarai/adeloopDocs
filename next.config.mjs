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
};

export default withMDX(config);
