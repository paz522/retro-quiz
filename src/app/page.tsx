import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="bg-retro-blue text-white p-2 text-center font-bold">
          ようこそ！レトロクイズへ
        </div>
        <div className="retro-card mb-4">
          <p className="text-lg mb-4">
            このサイトは<span className="text-retro-red font-bold">昭和・平成の懐かしい話題</span>に関するクイズサイトです。
          </p>
          <p className="mb-4">
            <span className="bg-retro-yellow px-1">最終更新日: 2024年3月21日</span>
          </p>
          <div className="retro-divider"></div>
        </div>
      </div>
      
      <div className="retro-card mb-6">
        <h2 className="text-xl font-bold mb-4 bg-retro-blue text-white p-1">クイズを選ぶ</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Link 
            href="/quiz/custom?era=showa"
            className="retro-link block p-3 border border-gray-400 bg-[#FFFFCC] hover:bg-[#FFFF99]"
          >
            <h3 className="font-bold text-lg mb-2 text-retro-text">昭和編</h3>
            <p className="text-sm">1926年～1989年の懐かしい話題</p>
          </Link>
          
          <Link 
            href="/quiz/custom?era=heisei"
            className="retro-link block p-3 border border-gray-400 bg-[#CCFFFF] hover:bg-[#99FFFF]"
          >
            <h3 className="font-bold text-lg mb-2 text-retro-text">平成編</h3>
            <p className="text-sm">1989年～2019年の懐かしい話題</p>
          </Link>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/quiz/random"
            className="retro-button block w-full text-center text-lg py-3 animate-pulse"
          >
            クイズに挑戦する
          </Link>
        </div>
      </div>
      
      <div className="retro-card">
        <h2 className="text-xl font-bold mb-4 bg-retro-blue text-white p-1">遊び方</h2>
        <table className="retro-table mb-4">
          <tbody>
            <tr>
              <td className="w-8 text-center font-bold">1.</td>
              <td><span className="text-retro-red font-bold">間違えるまで続く</span>クイズに挑戦！何問連続正解できるか挑戦しよう</td>
            </tr>
            <tr>
              <td className="text-center font-bold">2.</td>
              <td>正解すると次の問題へ進み、懐かしい豆知識も表示されます</td>
            </tr>
            <tr>
              <td className="text-center font-bold">3.</td>
              <td>1問でも間違えるとゲームオーバー！あなたの連続正解記録に挑戦しよう</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 text-xs text-center">
        <p>当サイトは<span className="text-retro-red">Internet Explorer 4.0</span>以上で最適に表示されます</p>
        <p>推奨解像度: 800×600</p>
      </div>
    </div>
  );
} 