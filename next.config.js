/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    GEOCODING_URL: process.env.GEOCODING_URL
  }
}

module.exports = nextConfig
