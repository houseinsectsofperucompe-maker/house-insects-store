import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/dv3mvukmq/**' }],
    minimumCacheTTL: 86400,
  },
}
export default nextConfig
