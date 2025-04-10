/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  transpilePackages: ['three'],
  images: {
    domains: ['shared.fastly.steamstatic.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
