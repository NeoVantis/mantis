import { Button, Card } from 'mantis-ui';

const CardVariants = () => {
  return (
    <div className="showcase-grid showcase-grid--3">
      <Card variant="default">
        <h3 style={{ margin: '0 0 1rem 0' }}>Default Card</h3>
        <p style={{ margin: 0, color: '#64748b' }}>
          This is a basic card with default styling.
        </p>
      </Card>
      
      <Card 
        variant="elevated" 
        header={<strong>Card with Header</strong>}
      >
        <p style={{ margin: 0, color: '#64748b' }}>
          This card has an elevated appearance with a header section.
        </p>
      </Card>
      
      <Card 
        variant="interactive"
        hoverable
        onClick={() => alert('Card clicked!')}
        footer={
          <Button size="sm" fullWidth>
            Learn More
          </Button>
        }
      >
        <h3 style={{ margin: '0 0 1rem 0' }}>Interactive Card</h3>
        <p style={{ margin: 0, color: '#64748b' }}>
          Click this card to see the interaction.
        </p>
      </Card>
    </div>
  );
};

export default CardVariants;
