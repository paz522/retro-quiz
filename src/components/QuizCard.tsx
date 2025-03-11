import React from 'react';
import { Quiz } from '@/lib/types';

interface QuizCardProps {
  quiz: Quiz;
  selectedAnswer: string | null;
  isAnswered: boolean;
  showTrivia: boolean;
  onSelectAnswer: (answer: string) => void;
  onNextQuiz: () => void;
  isGameOver?: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  selectedAnswer,
  isAnswered,
  showTrivia,
  onSelectAnswer,
  onNextQuiz,
  isGameOver = false,
}) => {
  const isCorrect = selectedAnswer === quiz.correctAnswer;

  return (
    <div className="retro-card">
      <div className="bg-retro-blue text-white p-2 font-bold mb-4">
        <div className="flex justify-between items-center">
          <span>
            {quiz.era === 'showa' ? '昭和' : '平成'} {quiz.year}年
          </span>
          <span>
            {quiz.category === 'tv' && 'テレビ'}
            {quiz.category === 'music' && '音楽'}
            {quiz.category === 'sports' && 'スポーツ'}
            {quiz.category === 'news' && 'ニュース'}
            {quiz.category === 'culture' && '文化'}
            {quiz.category === 'politics' && '政治・経済'}
          </span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-6 text-retro-text bg-[#FFFFCC] p-2 border border-gray-400">{quiz.question}</h3>
      
      <div className="space-y-3 mb-6">
        {quiz.options.map((option) => (
          <button
            key={option}
            className={`w-full text-left p-3 border-2 ${
              !isAnswered
                ? 'bg-[#C0C0C0] border-t-white border-l-white border-b-gray-800 border-r-gray-800 hover:bg-gray-300 text-black'
                : option === quiz.correctAnswer
                ? 'bg-retro-green text-white border-retro-green'
                : selectedAnswer === option
                ? 'bg-retro-red text-white border-retro-red'
                : 'bg-[#C0C0C0] border-t-white border-l-white border-b-gray-800 border-r-gray-800 text-gray-600 opacity-70'
            }`}
            onClick={() => !isAnswered && onSelectAnswer(option)}
            disabled={isAnswered}
          >
            {option}
          </button>
        ))}
      </div>
      
      {isAnswered && (
        <div className="mt-6">
          <div className={`p-4 border-2 mb-4 ${isCorrect ? 'bg-[#CCFFCC] border-retro-green' : 'bg-[#FFCCCC] border-retro-red'}`}>
            <p className="font-bold mb-2 text-center text-lg">
              {isCorrect ? '🎉 正解！ 🎉' : '😢 不正解... ゲームオーバー 😢'}
            </p>
            <p className="text-center">正解は: <span className="font-bold">{quiz.correctAnswer}</span></p>
            {!isCorrect && (
              <p className="text-center mt-2 text-retro-red font-bold">
                間違えるまで続くモードでは、1問でも間違えるとゲーム終了です！
              </p>
            )}
          </div>
          
          {showTrivia && (
            <div className="mt-6 space-y-4">
              <div className="border-2 border-gray-400 bg-white">
                <div className="bg-retro-blue text-white p-2 font-bold">
                  豆知識
                </div>
                <div className="p-4 space-y-6">
                  <div>
                    <p className="text-lg mb-2">{quiz.trivia.mainText}</p>
                  </div>

                  {quiz.trivia.historicalContext && (
                    <div>
                      <h5 className="font-bold text-md mb-2 bg-[#000080] text-white p-1">📅 時代背景</h5>
                      <p className="text-black p-2 border border-gray-300 bg-[#F0F0F0]">{quiz.trivia.historicalContext}</p>
                    </div>
                  )}

                  {quiz.trivia.socialImpact && (
                    <div>
                      <h5 className="font-bold text-md mb-2 bg-[#000080] text-white p-1">💫 社会への影響</h5>
                      <p className="text-black p-2 border border-gray-300 bg-[#F0F0F0]">{quiz.trivia.socialImpact}</p>
                    </div>
                  )}

                  {quiz.trivia.statistics && (
                    <div>
                      <h5 className="font-bold text-md mb-2 bg-[#000080] text-white p-1">📊 データで見る</h5>
                      <p className="text-black p-2 border border-gray-300 bg-[#F0F0F0]">{quiz.trivia.statistics}</p>
                    </div>
                  )}

                  {quiz.trivia.relatedEvents && quiz.trivia.relatedEvents.length > 0 && (
                    <div>
                      <h5 className="font-bold text-md mb-2 bg-[#000080] text-white p-1">🔍 関連する出来事</h5>
                      <ul className="list-disc list-inside text-black p-2 border border-gray-300 bg-[#F0F0F0]">
                        {quiz.trivia.relatedEvents.map((event, index) => (
                          <li key={index}>{event}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {quiz.trivia.funFacts && quiz.trivia.funFacts.length > 0 && (
                    <div>
                      <h5 className="font-bold text-md mb-2 bg-[#000080] text-white p-1">💡 さらに面白い話</h5>
                      <ul className="list-disc list-inside text-black p-2 border border-gray-300 bg-[#F0F0F0]">
                        {quiz.trivia.funFacts.map((fact, index) => (
                          <li key={index}>{fact}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <button
            className="retro-button w-full mt-6 text-center font-bold"
            onClick={onNextQuiz}
          >
            {isCorrect ? '次の問題へ' : '結果を見る'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard; 