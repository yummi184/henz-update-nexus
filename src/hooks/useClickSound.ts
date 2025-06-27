
import { useCallback } from 'react';

export const useClickSound = () => {
  const playClickSound = useCallback(() => {
    try {
      const audio = new Audio('/sound.mp3');
      audio.volume = 0.3; // Set volume to 30% to not be too loud
      audio.play().catch(error => {
        // Silently handle audio play errors (some browsers block autoplay)
        console.log('Click sound could not be played:', error);
      });
    } catch (error) {
      // Silently handle any audio creation errors
      console.log('Click sound could not be created:', error);
    }
  }, []);

  return { playClickSound };
};
