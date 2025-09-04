import { Button } from 'mantis-ui';

const ButtonVariants = () => {
  return (
    <div className="showcase-demo-card">
      <h3>Button Variants</h3>
      <div className="showcase-buttons-demo">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="error">Error</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  );
};

export default ButtonVariants;
