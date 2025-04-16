/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  transpilePackages: ['three'],
  images: {
    domains: ['shared.fastly.steamstatic.com', 'devcouse4-team14-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: '/steam-video/:path*',
        destination: 'http://video.akamai.steamstatic.com/store_trailers/:path*',
      },
    ];
  },
};

export default nextConfig;
