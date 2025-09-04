import { useState } from 'react';
import { MainLayout } from './components/layout';
import { Dashboard } from './pages/Dashboard';
import { ButtonPage, CardPage, TablePage } from './pages/Components';
import { AnimationsPage } from './pages/Animations';
import { SettingsPage } from './pages/Settings';
import './App.css';

function App() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [animationKeys, setAnimationKeys] = useState<Record<string, number>>({});

  const resetAnimations = (cardId: string) => {
    setAnimationKeys(prev => ({
      ...prev,
      [cardId]: Date.now()
    }));
  };

  const handleLoadingDemo = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2000);
  };

  const handleSidebarItemClick = (itemId: string) => {
    setCurrentPage(itemId);
  };

  // Render different content based on current page
  const renderPageContent = () => {
    
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPageChange={handleSidebarItemClick} />;

      case 'buttons':
        return <ButtonPage buttonLoading={buttonLoading} onLoadingDemo={handleLoadingDemo} />;

      case 'cards':
        return <CardPage />;

      case 'tables':
        return <TablePage />;

      case 'animations':
        return <AnimationsPage animationKeys={animationKeys} resetAnimations={resetAnimations} />;

      case 'settings':
        return <SettingsPage />;

      default:
        return (
          <div className="showcase-section">
            <h1>Page Not Found</h1>
            <p>The requested page could not be found.</p>
          </div>
        );
    }
  };

  return (
    <MainLayout 
      currentPage={currentPage} 
      onPageChange={handleSidebarItemClick}
    >
      {renderPageContent()}
    </MainLayout>
  );
}

export default App;
