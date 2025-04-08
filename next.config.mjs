/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  images: {
    domains: ['shared.fastly.steamstatic.com'],
  },
};

export default nextConfig;
