/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: '*.supabase.co' },
        ],
    },
    async rewrites() {
        return [
            { source: '/', destination: '/tienda' },
        ];
    },
};

module.exports = nextConfig;
