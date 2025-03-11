'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import QuizCard from '@/components/QuizCard';
import QuizProgress from '@/components/QuizProgress';
import QuizResult from '@/components/QuizResult';
import { getQuizzesByCategory, getQuizzesByEra, getRandomQuizzes, quizzes as allQuizzes } from '@/lib/quizData';
import { QuizState, Quiz, CategoryId, EraId } from '@/lib/types';

// 初期ロード時の問題数
const INITIAL_QUIZ_COUNT = 10;

export default function CustomQuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
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
  const [category, setCategory] = useState<string | null>(null);
  const [era, setEra] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  
  useEffect(() => {
    // URLパラメータからカテゴリーと年代を取得
    const categoryParam = searchParams.get('category');
    const eraParam = searchParams.get('era');
    
    setCategory(categoryParam);
    setEra(eraParam);
    
    let filteredQuizzes: Quiz[] = [];
    
    if (categoryParam && eraParam) {
      // カテゴリーと年代の両方が指定されている場合
      const categoryQuizzes = getQuizzesByCategory(categoryParam as CategoryId);
      filteredQuizzes = categoryQuizzes.filter(quiz => quiz.era === eraParam as EraId);
    } else if (categoryParam) {
      // カテゴリーのみ指定されている場合
      filteredQuizzes = getQuizzesByCategory(categoryParam as CategoryId);
    } else if (eraParam) {
      // 年代のみ指定されている場合
      filteredQuizzes = getQuizzesByEra(eraParam as EraId);
    } else {
      // どちらも指定されていない場合はランダム
      filteredQuizzes = getRandomQuizzes(INITIAL_QUIZ_COUNT);
    }
    
    // 初期クイズをランダムに選択
    const initialQuizzes = filteredQuizzes.length > INITIAL_QUIZ_COUNT
      ? filteredQuizzes.sort(() => 0.5 - Math.random()).slice(0, INITIAL_QUIZ_COUNT)
      : filteredQuizzes;
    
    setQuizState(prev => ({
      ...prev,
      quizzes: initialQuizzes,
    }));
    
    // 使用済みクイズIDを記録
    const initialIds = initialQuizzes.map(quiz => quiz.id);
    setUsedQuizIds(initialIds);
    
    setIsLoading(false);
  }, [searchParams]);
  
  // 新しいクイズを追加する関数
  const addNewQuiz = () => {
    let unusedQuizzes: Quiz[] = [];
    
    // フィルタリング条件に基づいて未使用のクイズを取得
    if (category && era) {
      const categoryQuizzes = getQuizzesByCategory(category as CategoryId);
      unusedQuizzes = categoryQuizzes
        .filter(quiz => quiz.era === era as EraId)
        .filter(quiz => !usedQuizIds.includes(quiz.id));
    } else if (category) {
      unusedQuizzes = getQuizzesByCategory(category as CategoryId)
        .filter(quiz => !usedQuizIds.includes(quiz.id));
    } else if (era) {
      unusedQuizzes = getQuizzesByEra(era as EraId)
        .filter(quiz => !usedQuizIds.includes(quiz.id));
    } else {
      unusedQuizzes = allQuizzes.filter(quiz => !usedQuizIds.includes(quiz.id));
    }
    
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
    router.push('/quiz/select');
  };
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">クイズを読み込み中...</p>
      </div>
    );
  }
  
  if (quizState.quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl mb-6">選択した条件に一致するクイズがありません。</p>
        <button
          className="retro-button"
          onClick={() => router.push('/quiz/select')}
        >
          選択画面に戻る
        </button>
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