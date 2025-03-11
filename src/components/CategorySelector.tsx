import React from 'react';
import { CategoryInfo } from '@/lib/types';

interface CategorySelectorProps {
  categories: CategoryInfo[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`p-3 border-2 flex flex-col items-center justify-center ${
              selectedCategory === category.id
                ? 'bg-[#000080] text-white border-white'
                : 'bg-[#C0C0C0] border-t-white border-l-white border-b-gray-800 border-r-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            <span className="text-3xl mb-2">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>
      
      {selectedCategory && (
        <div className="mt-4 p-2 bg-[#FFFFCC] border border-gray-400 text-center">
          <p className="font-bold">
            「{categories.find(c => c.id === selectedCategory)?.name}」カテゴリーが選択されました
          </p>
        </div>
      )}
    </div>
  );
};

export default CategorySelector; 