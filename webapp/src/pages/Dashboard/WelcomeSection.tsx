import { Card } from 'mantis-ui';

interface WelcomeSectionProps {
  onPageChange: (pageId: string) => void;
}

const WelcomeSection = ({ onPageChange }: WelcomeSectionProps) => {
  return (
    <div className="showcase-section">
      <h2>Welcome to Mantis UI</h2>
      <p>Explore our comprehensive component library designed for building beautiful internal websites with minimal effort.</p>
      
      <div className="showcase-grid showcase-grid--3">
        <Card variant="elevated" onClick={() => onPageChange('buttons')}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Buttons</h3>
          <p style={{ margin: 0, color: '#64748b' }}>
            Versatile button components with multiple variants and states.
          </p>
        </Card>
        
        <Card variant="elevated" onClick={() => onPageChange('cards')}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Cards</h3>
          <p style={{ margin: 0, color: '#64748b' }}>
            Flexible card containers for organizing content.
          </p>
        </Card>
        
        <Card variant="elevated" onClick={() => onPageChange('tables')}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Tables</h3>
          <p style={{ margin: 0, color: '#64748b' }}>
            Feature-rich data tables with sorting and filtering.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default WelcomeSection;
