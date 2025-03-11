import React from 'react';

interface QuizResultProps {
  score: number;
  totalQuizzes: number;
  onRestart: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuizzes,
  onRestart,
}) => {
  // 間違えるまで続くモードでは、最後の問題は不正解なので、正解数と問題数が同じなら全問正解
  const isAllCorrect = score === totalQuizzes;
  
  // 90年代に流行ったワードを使った称号
  const getTitleAndDescription = (score: number): { title: string; description: string } => {
    if (score >= 25) {
      return {
        title: "伝説の「ナウでヤング」マスター",
        description: "あなたの知識は最先端！まさに「ちょーイケてる」レベルです！"
      };
    } else if (score >= 20) {
      return {
        title: "「メチャクチャ」知識王",
        description: "「ぶっちぎり」の知識量！あなたの実力は「最高っす」！"
      };
    } else if (score >= 15) {
      return {
        title: "「ギャル男」クイズ達人",
        description: "「超カッコイイ〜」知識レベル！「まじパネェ」です！"
      };
    } else if (score >= 10) {
      return {
        title: "「おやじギャグ」マスター",
        description: "「ダジャレ」のように覚えやすい知識の持ち主！「アッパレ」です！"
      };
    } else if (score >= 5) {
      return {
        title: "「ストリート系」見習い",
        description: "まだまだこれからだけど、「ナイス」な感じ！もう少し頑張ろう！"
      };
    } else if (score >= 1) {
      return {
        title: "「ダサかっこいい」初心者",
        description: "「まだまだだね」という感じですが、独特の魅力があります！"
      };
    } else {
      return {
        title: "「ガ〜ン」の称号",
        description: "「マジ卍」残念な結果ですが、「ドンマイ」！次回に期待！"
      };
    }
  };
  
  const { title, description } = getTitleAndDescription(score);
  
  let message = '';
  let emoji = '';
  
  if (score >= 20) {
    message = '素晴らしい！あなたは昭和・平成マスターです！';
    emoji = '🏆';
  } else if (score >= 10) {
    message = 'なかなかの知識をお持ちですね！';
    emoji = '🎉';
  } else if (score >= 5) {
    message = 'まずまずの結果です。もっと挑戦してみましょう！';
    emoji = '👍';
  } else {
    message = 'もっと昭和・平成の知識を深めましょう！';
    emoji = '📚';
  }
  
  const shareOnX = () => {
    const text = `レトロクイズで${score}問連続正解！称号「${title}」を獲得しました！`;
    const url = 'https://retroquiz.vercel.app';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };
  
  return (
    <div className="retro-card text-center">
      <div className="bg-retro-blue text-white p-2 font-bold mb-4">
        クイズ結果
      </div>
      
      <div className="text-6xl font-bold mb-4">
        {score}問連続正解
      </div>
      
      {isAllCorrect ? (
        <div className="text-xl mb-6 text-retro-green font-bold">
          全問正解！おめでとうございます！
        </div>
      ) : (
        <div className="text-xl mb-6">
          {score + 1}問目で不正解
        </div>
      )}
      
      <div className="mb-8">
        <div className="text-5xl mb-4">{emoji}</div>
        <div className="bg-[#FFFFCC] border-2 border-retro-blue p-4 mb-4">
          <h3 className="text-2xl font-bold text-retro-red mb-2">称号：{title}</h3>
          <p className="text-lg">{description}</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <button
          className="retro-button w-full"
          onClick={onRestart}
        >
          もう一度挑戦する
        </button>
        
        <button
          onClick={shareOnX}
          className="inline-flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
          <span className="font-sans text-sm">結果をシェアする</span>
        </button>
      </div>
    </div>
  );
};

export default QuizResult; 