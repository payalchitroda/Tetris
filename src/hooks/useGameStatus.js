import { useState, useEffect } from 'react';

export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  

  useEffect(() => {
    setScore(prev => prev + rowsCleared);
  }, [rowsCleared]);

  return [score, setScore];
};
