import { Button, Card, Animation } from 'mantis-ui';

interface AnimationsPageProps {
  animationKeys: Record<string, number>;
  resetAnimations: (cardId: string) => void;
}

const AnimationsPage = ({ animationKeys, resetAnimations }: AnimationsPageProps) => {
  return (
    <div className="showcase-section">
      <h1>Enhanced Animations</h1>
      <p>Comprehensive animation system with customizable duration, delay, easing, transform-origin, and responsive controls.</p>

      {/* Basic Animation Types */}
      <Card style={{ marginBottom: '2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => resetAnimations('basic')}
          >
            Reset
          </Button>
        </div>
        <h3>Basic Animation Types</h3>
        <div className="showcase-grid showcase-grid--5" key={animationKeys['basic']}>
          <Animation type="fadeIn" duration={600} delay={0}>
            <Button variant="primary">Fade In</Button>
          </Animation>
          <Animation type="slideInUp" duration={800} delay={200}>
            <Button variant="secondary">Slide Up</Button>
          </Animation>
          <Animation type="scaleIn" duration={500} delay={400}>
            <Button variant="success">Scale In</Button>
          </Animation>
          <Animation type="bounce" duration={1000} delay={600}>
            <Button variant="warning">Bounce</Button>
          </Animation>
          <Animation type="spin" duration={2000} delay={800}>
            <Button variant="error">Spin</Button>
          </Animation>
        </div>
      </Card>

      {/* Custom Duration & Easing */}
      <Card style={{ marginBottom: '2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => resetAnimations('duration')}
          >
            Reset
          </Button>
        </div>
        <h3>Custom Duration & Easing</h3>
        <div className="showcase-grid showcase-grid--3" key={animationKeys['duration']}>
          <Animation type="slideInRight" duration={1500} easing="ease-in-out">
            <Card variant="elevated">
              <h4>Slow & Smooth</h4>
              <p>1.5s duration<br/>ease-in-out</p>
            </Card>
          </Animation>
          <Animation type="slideInLeft" duration={300} easing="cubic-bezier(0.68, -0.55, 0.265, 1.55)">
            <Card variant="elevated">
              <h4>Fast & Bouncy</h4>
              <p>0.3s duration<br/>Custom cubic-bezier</p>
            </Card>
          </Animation>
          <Animation type="fadeIn" duration={2000} easing="linear" delay={500}>
            <Card variant="elevated">
              <h4>Linear & Delayed</h4>
              <p>2s duration<br/>500ms delay</p>
            </Card>
          </Animation>
        </div>
      </Card>

      {/* Transform Origin Control */}
      <Card style={{ marginBottom: '2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => resetAnimations('origin')}
          >
            Reset
          </Button>
        </div>
        <h3>Transform Origin Control</h3>
        <div className="showcase-grid showcase-grid--3" key={animationKeys['origin']}>
          <Animation 
            type="scaleIn" 
            duration={800} 
            config={{ transformOrigin: "top left" }}
            delay={100}
          >
            <Card variant="interactive">
              <h4>Scale from Top-Left</h4>
              <p>transformOrigin: "top left"</p>
            </Card>
          </Animation>
          <Animation 
            type="scaleIn" 
            duration={800} 
            config={{ transformOrigin: "center" }}
            delay={300}
          >
            <Card variant="interactive">
              <h4>Scale from Center</h4>
              <p>transformOrigin: "center"</p>
            </Card>
          </Animation>
          <Animation 
            type="scaleIn" 
            duration={800} 
            config={{ transformOrigin: "bottom right" }}
            delay={500}
          >
            <Card variant="interactive">
              <h4>Scale from Bottom-Right</h4>
              <p>transformOrigin: "bottom right"</p>
            </Card>
          </Animation>
        </div>
      </Card>

      {/* Loading Spinners */}
      <Card style={{ marginBottom: '2rem', position: 'relative' }}>
        <h3>Loading Spinners</h3>
        <p style={{ marginBottom: '1rem', color: '#64748b' }}>
          Perfect for loading states and progress indicators.
        </p>
        <div className="showcase-grid showcase-grid--4">
          <div style={{ textAlign: 'center' }}>
            <Animation type="spin" duration={1500}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                border: '4px solid #e2e8f0', 
                borderTop: '4px solid #3b82f6', 
                borderRadius: '50%',
                margin: '0 auto 0.5rem'
              }} />
            </Animation>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>Default Spinner</p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Animation type="spin" duration={2000}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                border: '4px solid #e2e8f0', 
                borderTop: '4px solid #10b981', 
                borderRadius: '50%',
                margin: '0 auto 0.5rem'
              }} />
            </Animation>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>Slow Spinner (2s)</p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Animation type="spin" duration={500}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                border: '4px solid #e2e8f0', 
                borderTop: '4px solid #f59e0b', 
                borderRadius: '50%',
                margin: '0 auto 0.5rem'
              }} />
            </Animation>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>Fast Spinner (0.5s)</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Animation type="spin">
              <div style={{ 
                borderRadius: '50%', 
                width: '40px', 
                height: '40px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#3b82f6',
                color: 'white',
                fontSize: '18px',
                margin: '0 auto 0.5rem'
              }}>
                ⟳
              </div>
            </Animation>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>Icon Spinner</p>
          </div>
        </div>
      </Card>
      
      <Card style={{ marginBottom: '2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => resetAnimations('advanced')}
          >
            Reset
          </Button>
        </div>
        <h3>Advanced Configuration</h3>
        <div className="showcase-grid showcase-grid--3" key={animationKeys['advanced']}>
          <Animation 
            type="pulse" 
            config={{ 
              iterationCount: 3
            }}
            duration={1000}
          >
            <Button variant="warning">Pulse 3x</Button>
          </Animation>
          <Animation 
            type="bounce" 
            config={{ 
              iterationCount: "infinite",
              direction: "alternate"
            }}
            duration={1500}
          >
            <Button variant="error">Infinite Bounce</Button>
          </Animation>
          <Animation 
            type="spin" 
            config={{ 
              iterationCount: "infinite",
              direction: "reverse"
            }}
            duration={2000}
          >
            <Button variant="ghost">Reverse Spin</Button>
          </Animation>
        </div>
      </Card>

      {/* Responsive Animation Control */}
      <Card style={{ marginBottom: '2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => resetAnimations('responsive')}
          >
            Reset
          </Button>
        </div>
        <h3>Responsive Animation Control</h3>
        <p style={{ marginBottom: '1rem', color: '#64748b' }}>
          These animations have different behaviors on mobile, tablet, and desktop. 
          Try resizing your browser window!
        </p>
        <div className="showcase-grid showcase-grid--2" key={animationKeys['responsive']}>
          <Animation 
            type="slideInLeft"
            responsive={{
              mobile: { duration: 300, delay: 0 },
              tablet: { duration: 600, delay: 100 },
              desktop: { duration: 1000, delay: 200 }
            }}
          >
            <Card variant="elevated">
              <h4>Responsive Timing (Full Config)</h4>
              <p>Mobile: 300ms → Tablet: 600ms → Desktop: 1000ms</p>
            </Card>
          </Animation>
          <Animation 
            simpleResponsive={{
              type: {
                mobile: 'fadeIn',
                tablet: 'slideInUp',
                desktop: 'scaleIn'
              },
              duration: {
                mobile: 400,
                tablet: 600,
                desktop: 800
              }
            }}
          >
            <Card variant="elevated">
              <h4>Simple Responsive API</h4>
              <p>Mobile: fadeIn(400ms) → Tablet: slideInUp(600ms) → Desktop: scaleIn(800ms)</p>
            </Card>
          </Animation>
        </div>
      </Card>

      {/* Scroll Triggered Animations */}
      <Card style={{ marginBottom: '2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => resetAnimations('scroll')}
          >
            Reset
          </Button>
        </div>
        <h3>Scroll-Triggered Animations</h3>
        <p style={{ marginBottom: '1rem', color: '#64748b' }}>
          Scroll down in the container below to see animations trigger when elements come into view:
        </p>
        <div style={{ 
          height: '300px', 
          overflow: 'auto', 
          border: '2px solid #e2e8f0', 
          borderRadius: '0.5rem', 
          padding: '1rem',
          backgroundColor: '#f8fafc'
        }} key={animationKeys['scroll']}>
          <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
            ↓ Scroll down to see animations ↓
          </div>
          <Animation type="slideInUp" triggerOnScroll>
            <Card variant="interactive" style={{ marginBottom: '1rem' }}>
              <h4>Scroll Animation 1</h4>
              <p>Triggers when scrolled into view</p>
            </Card>
          </Animation>
          <div style={{ height: '80px' }}></div>
          <Animation type="fadeIn" triggerOnScroll delay={200}>
            <Card variant="interactive" style={{ marginBottom: '1rem' }}>
              <h4>Scroll Animation 2</h4>
              <p>With 200ms delay</p>
            </Card>
          </Animation>
          <div style={{ height: '80px' }}></div>
          <Animation type="scaleIn" triggerOnScroll config={{ transformOrigin: "top" }}>
            <Card variant="interactive" style={{ marginBottom: '1rem' }}>
              <h4>Scroll Animation 3</h4>
              <p>Scale from top origin</p>
            </Card>
          </Animation>
          <div style={{ height: '100px' }}></div>
        </div>
      </Card>

      {/* Type Safety & Validation */}
      <Card style={{ marginBottom: '2rem' }}>
        <h3>Type Safety & Validation</h3>
        <p style={{ marginBottom: '1rem', color: '#64748b' }}>
          These examples demonstrate runtime validation and fallbacks for invalid values.
          Check the browser console for validation warnings.
        </p>
        <div className="showcase-grid showcase-grid--3">
          <Animation 
            type="scaleIn" 
            // @ts-ignore - Demonstrating validation
            easing="invalid-easing"
            duration={600}
          >
            <Card variant="interactive">
              <h4>Invalid Easing</h4>
              <p>Falls back to default "ease-out"</p>
            </Card>
          </Animation>
          <Animation 
            type="fadeIn"
            easing="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
            duration={800}
          >
            <Card variant="interactive">
              <h4>Valid Cubic Bezier</h4>
              <p>Type-safe custom easing</p>
            </Card>
          </Animation>
          <Animation 
            type="slideInUp"
            respectMotionPreference={false}
            duration={600}
          >
            <Card variant="interactive">
              <h4>Motion Override</h4>
              <p>Ignores prefers-reduced-motion</p>
            </Card>
          </Animation>
        </div>
      </Card>

      {/* Usage Examples */}
      <Card>
        <h3>Enhanced Usage Examples</h3>
        <div style={{ 
          backgroundColor: '#f1f5f9', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          whiteSpace: 'pre'
        }}>
{`// Basic usage with type-safe defaults
<Animation type="fadeIn" duration={600} delay={200}>
  <YourComponent />
</Animation>

// Loading spinner (infinite rotation by default)
<Animation type="spin">
  <div className="spinner-circle" />
</Animation>

// Custom speed spinner with validated easing
<Animation type="spin" duration={500} easing="cubic-bezier(0.25, 0.1, 0.25, 1)">
  <LoadingIcon />
</Animation>

// Transform origin control with validation
<Animation 
  type="scaleIn" 
  config={{ transformOrigin: "top left" }}
>
  <Modal />
</Animation>

// Simplified responsive animations (NEW API)
<Animation 
  simpleResponsive={{
    type: { mobile: 'fadeIn', desktop: 'slideInUp' },
    duration: { mobile: 300, desktop: 800 },
    disabled: ['tablet'] // Disable on tablets
  }}
>
  <Card />
</Animation>

// Advanced configuration with motion preferences
<Animation 
  type="bounce"
  respectMotionPreference={true} // Respects prefers-reduced-motion
  config={{
    iterationCount: 3,
    direction: "alternate"
  }}
>
  <Button />
</Animation>

// Full responsive control (for complex cases)
<Animation 
  responsive={{
    mobile: { type: 'fadeIn', duration: 300 },
    desktop: { type: 'slideInUp', duration: 800 }
  }}
>
  <Card />
</Animation>`}
        </div>
      </Card>
    </div>
  );
};

export default AnimationsPage;
