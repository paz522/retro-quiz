/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // 画像ホスティングドメインを追加
  },
  // Vercel Analyticsを有効化
};

module.exports = nextConfig; 