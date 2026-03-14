/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    i18n: {
        locales: ["vi", "en", "zh"],
        defaultLocale: "vi",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
        deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 64, 96, 128, 256, 384],
    },
};

export default nextConfig;
