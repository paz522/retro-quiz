import type { Metadata } from 'next';
import Link from 'next/link';
import AccessCounter from '@/components/AccessCounter';
import { Analytics } from '@vercel/analytics/react';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'レトロクイズ - 昭和・平成の懐かしクイズ',
  description: '昭和や平成のテレビ番組や音楽、スポーツなどをテーマにしたクイズアプリ。40～50代のおっさん向け懐かしクイズ！',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="font-retro bg-retro-bg text-retro-text">
        <div className="min-h-screen flex flex-col items-center">
          <header className="bg-retro-blue text-white py-4 border-b-4 border-retro-yellow w-full">
            <div className="retro-container relative max-w-4xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-display animate-blink text-center">
                ★ レトロクイズ ★
              </h1>
              <div className="flex flex-col md:flex-row justify-between items-center mt-2">
                <p className="bg-retro-yellow text-retro-text px-2 py-1 inline-block">
                  昭和・平成の懐かしクイズ
                </p>
                <div className="mt-2 md:mt-0">
                  <AccessCounter />
                </div>
              </div>
            </div>
          </header>
          
          <main className="py-8 bg-white mx-4 my-4 border border-gray-400 shadow-lg p-4 w-full max-w-4xl">
            <div className="text-center mb-4">
              <span className="inline-block bg-retro-red text-white px-2 py-1 animate-blink font-bold">NEW!</span>
            </div>
            {children}
          </main>
          
          <footer className="bg-retro-blue text-white py-4 text-center text-sm border-t-4 border-retro-yellow w-full">
            <div className="retro-container max-w-4xl mx-auto">
              <p className="mb-2">
                <span className="animate-blink">★</span>
                当サイトは個人で運営しています
                <span className="animate-blink">★</span>
              </p>
              <div className="flex justify-center space-x-4 my-2">
                <Link 
                  href="/"
                  className="retro-button bg-[#C0C0C0] text-retro-text px-4 py-1 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 hover:bg-gray-300 transition-colors"
                >
                  トップへ戻る
                </Link>
                
                <a 
                  href="https://twitter.com/intent/tweet?text=昭和・平成の懐かしクイズに挑戦中！&url=https://retroquiz.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                  <span className="font-sans text-sm">シェアする</span>
                </a>
              </div>
              <div className="flex justify-center space-x-4 my-2">
                <a href="#" className="retro-link text-white">サイトマップ</a>
                <a href="#" className="retro-link text-white">お問い合わせ</a>
                <a href="#" className="retro-link text-white">リンク集</a>
              </div>
              <p className="text-xs">
                © 2025 レトロクイズ - 昭和・平成の懐かしクイズ
              </p>
              <p className="text-xs mt-2">
                最終更新日: 2024年3月21日
              </p>
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
} 