
import { useCallback } from 'react';

export const useClickSound = () => {
  const playClickSound = useCallback(() => {
    try {
      const audio = new Audio('/sound.mp3');
      audio.volume = 0.3;
      audio.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    } catch (error) {
      console.log('Audio creation failed:', error);
    }
  }, []);

  return { playClickSound };
};
