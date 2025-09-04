import CardVariants from './CardVariants';
import CardExamples from './CardExamples';

const CardPage = () => {
  return (
    <div className="showcase-section">
      <h1>Cards</h1>
      <p>Flexible card containers with headers, footers, and interactive states.</p>
      
      <CardVariants />
      <CardExamples />
    </div>
  );
};

export default CardPage;
