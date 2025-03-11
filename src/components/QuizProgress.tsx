import React from 'react';

interface QuizProgressProps {
  currentQuizIndex: number;
  totalQuizzes: number | null | undefined;
  score: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({
  currentQuizIndex,
  totalQuizzes,
  score,
}) => {
  const progressPercentage = totalQuizzes ? ((currentQuizIndex + 1) / totalQuizzes) * 100 : 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">
          {totalQuizzes 
            ? `問題 ${currentQuizIndex + 1}/${totalQuizzes}` 
            : `問題 ${currentQuizIndex + 1} - 間違えるまで続く`}
        </span>
        <span className="text-sm font-medium">
          スコア: {score}/{currentQuizIndex}
        </span>
      </div>
      {totalQuizzes ? (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-retro-blue h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      ) : (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-retro-green h-2.5 rounded-full"
            style={{ width: '100%' }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default QuizProgress; 