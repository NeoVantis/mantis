import WelcomeSection from './WelcomeSection';
import GettingStartedSection from './GettingStartedSection';

interface DashboardProps {
  onPageChange: (pageId: string) => void;
}

const Dashboard = ({ onPageChange }: DashboardProps) => {
  return (
    <>
      <div className="showcase-header">
        <h1>Mantis UI Showcase</h1>
        <p>A powerful and lightweight component library for internal websites</p>
      </div>

      <WelcomeSection onPageChange={onPageChange} />
      <GettingStartedSection />
    </>
  );
};

export default Dashboard;
