import { ReactNode } from 'react';
import { Sidebar, SidebarItem, ResponsiveProvider } from 'mantis-ui';
import { useSidebar } from '../../hooks';

// Sidebar navigation items
const getSidebarItems = (handleClick: (id: string) => void, currentPage: string): SidebarItem[] => [
  {
    id: 'dashboard',
    label: 'Dashboard',
    isActive: currentPage === 'dashboard',
    onClick: () => handleClick('dashboard'),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
        <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
        <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
        <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
      </svg>
    ),
  },
  {
    id: 'components',
    label: 'Components',
    isActive: currentPage === 'components',
    onClick: () => handleClick('components'),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="6" height="6" stroke="currentColor" strokeWidth="2" rx="2"/>
        <rect x="14" y="4" width="6" height="6" stroke="currentColor" strokeWidth="2" rx="2"/>
        <rect x="4" y="14" width="6" height="6" stroke="currentColor" strokeWidth="2" rx="2"/>
        <rect x="14" y="14" width="6" height="6" stroke="currentColor" strokeWidth="2" rx="2"/>
      </svg>
    ),
    children: [
      { 
        id: 'buttons', 
        label: 'Buttons',
        onClick: () => handleClick('buttons')
      },
      { 
        id: 'cards', 
        label: 'Cards',
        onClick: () => handleClick('cards')
      },
      { 
        id: 'tables', 
        label: 'Tables',
        onClick: () => handleClick('tables')
      },
      { 
        id: 'navbar', 
        label: 'Navbar',
        onClick: () => handleClick('navbar')
      },
    ],
  },
  {
    id: 'animations',
    label: 'Animations',
    isActive: currentPage === 'animations',
    onClick: () => handleClick('animations'),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    isActive: currentPage === 'settings',
    onClick: () => handleClick('settings'),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
];

interface MainLayoutProps {
  children: ReactNode;
  currentPage: string;
  onPageChange: (pageId: string) => void;
}

const MainLayout = ({ children, currentPage, onPageChange }: MainLayoutProps) => {
  // Use custom hook for sidebar state
  const { sidebarCollapsed, setSidebarCollapsed } = useSidebar();

  const sidebarItems = getSidebarItems(onPageChange, currentPage);

  return (
    <ResponsiveProvider>
      <div className="mantis-ui showcase-container">
        <Sidebar
          items={sidebarItems}
          collapsible
          collapsed={sidebarCollapsed}
          onCollapseChange={setSidebarCollapsed}
          header={
            <div>
              <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.25rem' }}>
                {sidebarCollapsed ? 'M' : 'Mantis UI'}
              </h3>
              {!sidebarCollapsed && (
                <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                  Component Library
                </p>
              )}
            </div>
          }
          footer={
            !sidebarCollapsed && (
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                v1.0.0 • NeoVantis
              </div>
            )
          }
        />
        
        <main className="showcase-main">
          {children}
        </main>
      </div>
    </ResponsiveProvider>
  );
};

export default MainLayout;
