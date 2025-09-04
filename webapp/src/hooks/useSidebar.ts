import { useState } from 'react';

/**
 * Hook for managing sidebar state
 * Returns collapsed state and setter function
 */
export function useSidebar() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return {
    sidebarCollapsed,
    setSidebarCollapsed
  };
}
