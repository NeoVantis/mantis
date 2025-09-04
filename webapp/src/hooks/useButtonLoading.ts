import { useState } from 'react';

/**
 * Hook for managing button loading states
 * Returns loading state and demo handler
 */
export function useButtonLoading() {
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleLoadingDemo = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2000);
  };

  return {
    buttonLoading,
    handleLoadingDemo
  };
}
