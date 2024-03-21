import path from 'path'

/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  basePath: "/thriving-coders-dashboard",
  async redirects() {
    return [
      {
          source: '/',
          destination: '/thriving-coders-dashboard',
          basePath: false,
          permanent: false
      }
    ]
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.justboil.me',
      },
    ],
  },
}

export default nextConfig