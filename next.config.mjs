/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Разреши external screenshot/preview изображения, ако решиш да ги ползваш.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
