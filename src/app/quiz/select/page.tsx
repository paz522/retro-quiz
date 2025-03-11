'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CategorySelector from '@/components/CategorySelector';
import { categories } from '@/lib/quizData';

export default function SelectQuizPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  
  const handleStartQuiz = () => {
    if (selectedCategory) {
      router.push(`/quiz/custom?category=${selectedCategory}`);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="retro-card mb-6">
        <div className="bg-retro-blue text-white p-2 font-bold mb-4">
          カテゴリーを選ぶ
        </div>
        
        <div className="retro-under-construction mb-4">
          好きなカテゴリーを選んでクイズに挑戦しよう！<br />
          <span className="text-retro-red font-bold">※間違えるまで続くモードです。何問連続正解できるか挑戦しよう！</span>
        </div>
        
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
        
        <div className="retro-divider"></div>
        
        <div className="mt-4 space-y-4">
          <button
            className={`retro-button w-full text-center ${!selectedCategory ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleStartQuiz}
            disabled={!selectedCategory}
          >
            クイズを開始する
          </button>
          
          <Link
            href="/"
            className="retro-link block text-center"
          >
            トップページに戻る
          </Link>
        </div>
      </div>
      
      <div className="retro-card">
        <div className="bg-retro-blue text-white p-2 font-bold mb-4">
          カテゴリー説明
        </div>
        <table className="retro-table w-full">
          <tbody>
            <tr>
              <td className="font-bold">テレビ</td>
              <td>昭和・平成の人気テレビ番組、アニメ、ドラマに関するクイズ</td>
            </tr>
            <tr>
              <td className="font-bold">音楽</td>
              <td>ヒット曲、アーティスト、音楽トレンドに関するクイズ</td>
            </tr>
            <tr>
              <td className="font-bold">スポーツ</td>
              <td>プロ野球、Jリーグ、オリンピックなどのスポーツイベントに関するクイズ</td>
            </tr>
            <tr>
              <td className="font-bold">ニュース</td>
              <td>昭和・平成の重大ニュース、社会現象に関するクイズ</td>
            </tr>
            <tr>
              <td className="font-bold">文化</td>
              <td>流行、ファッション、ゲーム、おもちゃなどの文化に関するクイズ</td>
            </tr>
            <tr>
              <td className="font-bold">政治・経済</td>
              <td>昭和・平成の政治、経済、国際関係に関するクイズ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 