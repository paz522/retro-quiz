'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuizCard from '@/components/QuizCard';
import QuizProgress from '@/components/QuizProgress';
import QuizResult from '@/components/QuizResult';
import { getRandomQuizzes, quizzes, categories } from '@/lib/quizData';
import { QuizState, Quiz, CategoryId } from '@/lib/types';

// 初期ロード時の問題数
const INITIAL_QUIZ_COUNT = 10;

export default function RandomQuizPage() {
  const router = useRouter();
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuizIndex: 0,
    score: 0,
    quizzes: [],
    selectedAnswer: null,
    isAnswered: false,
    showTrivia: false,
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [usedQuizIds, setUsedQuizIds] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  
  useEffect(() => {
    // バランスの取れたランダムクイズを生成する
    const generateBalancedRandomQuizzes = () => {
      // 各カテゴリから少なくとも1問ずつ選ぶ
      let balancedQuizzes: Quiz[] = [];
      
      // 各カテゴリから1問ずつ選ぶ
      categories.forEach(category => {
        const categoryQuizzes = quizzes.filter(quiz => quiz.category === category.id);
        if (categoryQuizzes.length > 0) {
          const randomIndex = Math.floor(Math.random() * categoryQuizzes.length);
          balancedQuizzes.push(categoryQuizzes[randomIndex]);
        }
      });
      
      // 残りの問題をランダムに選ぶ
      const remainingCount = INITIAL_QUIZ_COUNT - balancedQuizzes.length;
      if (remainingCount > 0) {
        // すでに選ばれた問題のIDを除外
        const selectedIds = balancedQuizzes.map(quiz => quiz.id);
        const remainingQuizzes = quizzes.filter(quiz => !selectedIds.includes(quiz.id));
        
        // 残りの問題からランダムに選ぶ
        const additionalQuizzes = getRandomQuizzes(remainingCount).filter(
          quiz => !selectedIds.includes(quiz.id)
        );
        
        balancedQuizzes = [...balancedQuizzes, ...additionalQuizzes];
      }
      
      // 順番をシャッフル
      return balancedQuizzes.sort(() => 0.5 - Math.random());
    };
    
    // バランスの取れたクイズセットを生成
    const initialQuizzes = generateBalancedRandomQuizzes();
    
    setQuizState(prev => ({
      ...prev,
      quizzes: initialQuizzes,
    }));
    
    // 使用済みクイズIDを記録
    const initialIds = initialQuizzes.map(quiz => quiz.id);
    setUsedQuizIds(initialIds);
    
    setIsLoading(false);
  }, []);
  
  // 新しいクイズを追加する関数
  const addNewQuiz = () => {
    // まだ使用していないクイズをフィルタリング
    const unusedQuizzes = quizzes.filter(quiz => !usedQuizIds.includes(quiz.id));
    
    // 使用していないクイズがある場合
    if (unusedQuizzes.length > 0) {
      // ランダムに1問選択
      const randomIndex = Math.floor(Math.random() * unusedQuizzes.length);
      const newQuiz = unusedQuizzes[randomIndex];
      
      // クイズリストに追加
      setQuizState(prev => ({
        ...prev,
        quizzes: [...prev.quizzes, newQuiz],
      }));
      
      // 使用済みIDに追加
      setUsedQuizIds(prev => [...prev, newQuiz.id]);
    }
  };
  
  const handleSelectAnswer = (answer: string) => {
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answer,
      isAnswered: true,
    }));
    
    const isCorrect = answer === quizState.quizzes[quizState.currentQuizIndex].correctAnswer;
    
    // 正解の場合はスコアを加算
    if (isCorrect) {
      setQuizState(prev => ({
        ...prev,
        score: prev.score + 1,
      }));
    } else {
      // 不正解の場合はゲームオーバーフラグを設定
      setIsGameOver(true);
    }
    
    // 少し待ってから豆知識を表示
    setTimeout(() => {
      setQuizState(prev => ({
        ...prev,
        showTrivia: true,
      }));
    }, 1000);
  };
  
  const handleNextQuiz = () => {
    // ゲームオーバーの場合は結果画面へ
    if (isGameOver) {
      setIsFinished(true);
      return;
    }
    
    const nextIndex = quizState.currentQuizIndex + 1;
    
    // 次の問題がない場合は新しい問題を追加
    if (nextIndex >= quizState.quizzes.length) {
      addNewQuiz();
    }
    
    // 次の問題へ
    setQuizState(prev => ({
      ...prev,
      currentQuizIndex: nextIndex,
      selectedAnswer: null,
      isAnswered: false,
      showTrivia: false,
    }));
  };
  
  const handleRestart = () => {
    router.push('/');
  };
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">クイズを読み込み中...</p>
      </div>
    );
  }
  
  if (isFinished) {
    return (
      <QuizResult
        score={quizState.score}
        totalQuizzes={quizState.currentQuizIndex + 1}
        onRestart={handleRestart}
      />
    );
  }
  
  const currentQuiz = quizState.quizzes[quizState.currentQuizIndex];
  
  return (
    <div>
      <QuizProgress
        currentQuizIndex={quizState.currentQuizIndex}
        totalQuizzes={undefined} // 無限モード
        score={quizState.score}
      />
      
      <QuizCard
        quiz={currentQuiz}
        selectedAnswer={quizState.selectedAnswer}
        isAnswered={quizState.isAnswered}
        showTrivia={quizState.showTrivia}
        onSelectAnswer={handleSelectAnswer}
        onNextQuiz={handleNextQuiz}
        isGameOver={isGameOver}
      />
    </div>
  );
} 