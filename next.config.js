/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: '13.212.186.59',
          },
        ],
      },
}

module.exports = nextConfig
