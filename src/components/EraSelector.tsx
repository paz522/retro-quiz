import React from 'react';
import { EraInfo } from '@/lib/types';

interface EraSelectorProps {
  eras: EraInfo[];
  selectedEra: string | null;
  onSelectEra: (eraId: string) => void;
}

const EraSelector: React.FC<EraSelectorProps> = ({
  eras,
  selectedEra,
  onSelectEra,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">年代を選択</h2>
      <div className="grid grid-cols-2 gap-3">
        {eras.map((era) => (
          <button
            key={era.id}
            className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center transition-all ${
              selectedEra === era.id
                ? 'border-retro-yellow bg-retro-yellow bg-opacity-10'
                : 'border-gray-200 hover:border-retro-yellow'
            }`}
            onClick={() => onSelectEra(era.id)}
          >
            <span className="font-bold text-xl mb-1">{era.name}</span>
            <span className="text-sm text-gray-600">{era.years}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EraSelector; 