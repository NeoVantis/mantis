import { Animation, Card } from 'mantis-ui';

const GettingStartedSection = () => {
  return (
    <div className="showcase-section">
      <Animation type="slideInUp" delay={400} triggerOnScroll>
        <h2>Getting Started</h2>
        <p>Start using Mantis UI in your projects with minimal setup.</p>
        
        <Card>
          <h3 style={{ margin: '0 0 1rem 0' }}>Installation</h3>
          <div style={{ 
            backgroundColor: '#f1f5f9', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            fontFamily: 'monospace',
            marginBottom: '1rem'
          }}>
            npm install mantis-ui
          </div>
          
          <h3 style={{ margin: '1.5rem 0 1rem 0' }}>Usage</h3>
          <div style={{ 
            backgroundColor: '#f1f5f9', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            fontFamily: 'monospace',
            fontSize: '0.875rem'
          }}>
            {`import { Button, Card, Table } from 'mantis-ui';

function MyApp() {
  return (
    <Card>
      <Button variant="primary">
        Hello Mantis UI!
      </Button>
    </Card>
  );
}`}
          </div>
        </Card>
      </Animation>
    </div>
  );
};

export default GettingStartedSection;
