/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export', // This is used for static export
  reactStrictMode: true,
  distDir: 'dist',
  images: {
    unoptimized: true, // This is valid only for static exports
  },
}

module.exports = nextConfig
