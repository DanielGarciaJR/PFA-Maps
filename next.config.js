/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    GEOCODING_URL: process.env.GEOCODING_URL,
    GEOJSON_URL: process.env.GEOJSON_URL,
    MAPBOX_STYLE: process.env.MAPBOX_STYLE
  }
}

module.exports = nextConfig
