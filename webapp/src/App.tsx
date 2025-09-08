import { MainLayout } from './components/layout';
import { Dashboard } from './pages/Dashboard';
import { ButtonPage, CardPage, TablePage, NavbarPage } from './pages/Components';
import { AnimationsPage } from './pages/Animations';
import { SettingsPage } from './pages/Settings';
import { useAnimationReset, usePageNavigation, useButtonLoading } from './hooks';
import './App.css';

function App() {
  // Use custom hooks for state management
  const { animationKeys, resetAnimations } = useAnimationReset();
  const { currentPage, handleSidebarItemClick } = usePageNavigation();
  const { buttonLoading, handleLoadingDemo } = useButtonLoading();

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

      case 'navbar':
        return <NavbarPage />;

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
