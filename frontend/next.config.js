/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.flaticon.com',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig
