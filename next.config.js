/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  distDir: 'build',
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    path: "/_next/image",
    loader: "default",
    domains: ["res.cloudinary.com"],
  },
 };