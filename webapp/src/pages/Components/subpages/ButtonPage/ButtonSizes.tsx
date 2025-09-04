import { Button } from 'mantis-ui';

interface ButtonSizesProps {
  buttonLoading: boolean;
  onLoadingDemo: () => void;
}

const ButtonSizes = ({ buttonLoading, onLoadingDemo }: ButtonSizesProps) => {
  return (
    <div className="showcase-demo-card">
      <h3>Button Sizes & States</h3>
      <div className="showcase-buttons-demo">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button disabled>Disabled</Button>
        <Button loading={buttonLoading} onClick={onLoadingDemo}>
          {buttonLoading ? 'Loading...' : 'Click to Load'}
        </Button>
      </div>
    </div>
  );
};

export default ButtonSizes;
