import { useState } from 'react';

/**
 * Hook for managing page navigation state
 * Returns current page and navigation handler
 */
export function usePageNavigation(initialPage: string = 'dashboard') {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleSidebarItemClick = (itemId: string) => {
    setCurrentPage(itemId);
  };

  return {
    currentPage,
    handleSidebarItemClick
  };
}
