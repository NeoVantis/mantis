import ButtonVariants from './ButtonVariants';
import ButtonSizes from './ButtonSizes';
import ButtonIcons from './ButtonIcons';
import ButtonExamples from './ButtonExamples';

interface ButtonPageProps {
  buttonLoading: boolean;
  onLoadingDemo: () => void;
}

const ButtonPage = ({ buttonLoading, onLoadingDemo }: ButtonPageProps) => {
  return (
    <div className="showcase-section">
      <h1>Buttons</h1>
      <p>Versatile button components with multiple variants, sizes, states, and icon support.</p>
      
      <div className="showcase-grid showcase-grid--2">
        <ButtonVariants />
        <ButtonSizes buttonLoading={buttonLoading} onLoadingDemo={onLoadingDemo} />
        <ButtonIcons />
      </div>

      <ButtonExamples />
    </div>
  );
};

export default ButtonPage;
