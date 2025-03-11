/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // 画像ホスティングドメインを追加
  },
};

module.exports = nextConfig; 