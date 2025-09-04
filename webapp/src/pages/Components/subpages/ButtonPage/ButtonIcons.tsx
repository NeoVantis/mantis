import { Button } from 'mantis-ui';

const ButtonIcons = () => {
  return (
    <>
      <div className="showcase-demo-card">
        <h3>Buttons with Icons</h3>
        <div className="showcase-buttons-demo">
          <Button 
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            iconPosition="left"
          >
            Add Item
          </Button>
          <Button 
            variant="secondary"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            iconPosition="right"
          >
            Edit
          </Button>
          <Button 
            variant="error"
            size="sm"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            iconPosition="left"
          >
            Delete
          </Button>
        </div>
      </div>
      
      <div className="showcase-demo-card">
        <h3>Icon-Only Buttons</h3>
        <div className="showcase-buttons-demo">
          <Button 
            variant="primary"
            size="sm"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
          />
          <Button 
            variant="secondary"
            size="md"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
          />
          <Button 
            variant="ghost"
            size="lg"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" stroke="currentColor" strokeWidth="2"/>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
          />
        </div>
      </div>
    </>
  );
};

export default ButtonIcons;
