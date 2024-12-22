/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/creoinsight' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/creoinsight/' : '',
}

module.exports = nextConfig
