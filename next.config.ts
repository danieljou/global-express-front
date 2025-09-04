/**@type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: process.env.NEXT_PUBLIC_ALLOWED_DEV_ORIGINS
    ? process.env.NEXT_PUBLIC_ALLOWED_DEV_ORIGINS.split(',')
    : [],
}

module.exports = nextConfig
 