import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/dv3mvukmq/**' },
      { protocol: 'https', hostname: 'HouseInsects1967.b-cdn.net' },
      { protocol: 'https', hostname: '*.b-cdn.net' },
    ],
    minimumCacheTTL: 86400,
  },
}
export default nextConfig
