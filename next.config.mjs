/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'srf2jhdkfri8txna.public.blob.vercel-storage.com',
                port: '',
            },
        ],
    },
};

export default nextConfig;
