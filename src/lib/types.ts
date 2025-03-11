export type CategoryId = 'tv' | 'music' | 'sports' | 'news' | 'culture' | 'politics';
export type EraId = 'showa' | 'heisei';

export type TriviaContent = {
  mainText: string;          // メインの豆知識テキスト
  historicalContext?: string; // 当時の時代背景
  socialImpact?: string;     // 社会への影響
  relatedEvents?: string[];  // 関連する出来事
  statistics?: string;       // 統計データ
  funFacts?: string[];      // 追加の豆知識
};

export type Quiz = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  era: EraId;
  year: number;
  category: CategoryId;
  trivia: TriviaContent;
};

export interface QuizState {
  currentQuizIndex: number;
  score: number;
  quizzes: Quiz[];
  selectedAnswer: string | null;
  isAnswered: boolean;
  showTrivia: boolean;
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  icon: string;
}

export interface EraInfo {
  id: EraId;
  name: string;
  years: string;
} 