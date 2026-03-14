/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    i18n: {
        locales: ["vi", "en", "zh"],
        defaultLocale: "vi",
    },
};

export default nextConfig;
