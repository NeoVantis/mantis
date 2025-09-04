import { useState } from 'react';

/**
 * Hook for managing animation reset functionality
 * Returns animation keys and a reset function to force re-render animations
 */
export function useAnimationReset() {
  const [animationKeys, setAnimationKeys] = useState<Record<string, number>>({});

  const resetAnimations = (cardId: string) => {
    setAnimationKeys(prev => ({
      ...prev,
      [cardId]: Date.now()
    }));
  };

  return {
    animationKeys,
    resetAnimations
  };
}
