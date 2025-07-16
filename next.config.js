/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'bon-plan-cbd.fr'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 1080, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'framer-motion', 'swiper'],
  },
  // Configuration webpack simplifiée pour éviter les erreurs
  webpack: (config) => {
    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
