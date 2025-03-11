'use client';

import { useState, useEffect } from 'react';

const AccessCounter = () => {
  const [count, setCount] = useState<string>('00000000');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await fetch('/api/counter');
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error('カウンターの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounter();
  }, []);

  return (
    <div className="inline-block bg-black text-white px-4 py-2 text-sm font-mono border-2 border-gray-400 shadow-md rounded">
      <div className="text-retro-yellow font-bold mb-1">アクセスカウンター</div>
      <div className="bg-gray-800 px-3 py-1 rounded">
        {loading ? (
          <span className="animate-pulse">--------</span>
        ) : (
          <span className="text-lg tracking-wider">{count}</span>
        )}
      </div>
    </div>
  );
};

export default AccessCounter; 