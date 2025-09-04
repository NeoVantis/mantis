import { Card } from 'mantis-ui';

const CardExamples = () => {
  return (
    <div className="showcase-section" style={{ marginTop: '3rem' }}>
      <h2>Usage Examples</h2>
      <p>Learn how to use the Card component with different configurations.</p>
      
      <Card>
        <h3>Basic Usage</h3>
        <div style={{ 
          backgroundColor: '#f1f5f9', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          fontFamily: 'monospace',
          fontSize: '0.875rem'
        }}>
          {`import { Card } from 'mantis-ui';

<Card variant="default">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

<Card 
  variant="elevated"
  header={<strong>Header Content</strong>}
  footer={<Button>Action</Button>}
>
  <p>Card with header and footer</p>
</Card>`}
        </div>
      </Card>
    </div>
  );
};

export default CardExamples;
