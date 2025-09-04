import { Button, Card } from 'mantis-ui';

const ButtonExamples = () => {
  return (
    <div className="showcase-section" style={{ marginTop: '3rem' }}>
      <h2>Usage Examples</h2>
      <p>Learn how to use the Button component with different props and configurations.</p>
      
      <div className="showcase-grid showcase-grid--1">
        <Card>
          <h3>Basic Button Usage</h3>
          <div className="code-examples">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Example</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Code</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px', verticalAlign: 'top' }}>
                    <Button variant="primary">Save</Button>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', backgroundColor: '#f8fafc', verticalAlign: 'top' }}>
                    {`<Button variant="primary">Save</Button>`}
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', verticalAlign: 'top' }}>
                    Basic primary button with text
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px', verticalAlign: 'top' }}>
                    <Button variant="secondary" size="lg">Large Button</Button>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', backgroundColor: '#f8fafc', verticalAlign: 'top' }}>
                    {`<Button variant="secondary" size="lg">Large Button</Button>`}
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', verticalAlign: 'top' }}>
                    Large secondary button
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px', verticalAlign: 'top' }}>
                    <Button disabled>Disabled</Button>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', backgroundColor: '#f8fafc', verticalAlign: 'top' }}>
                    {`<Button disabled>Disabled</Button>`}
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', verticalAlign: 'top' }}>
                    Disabled button state
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h3>Icon Button Examples</h3>
          <div className="code-examples">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Example</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Code</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px', verticalAlign: 'top' }}>
                    <Button 
                      icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2"/></svg>}
                      iconPosition="left"
                    >
                      Add Item
                    </Button>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', backgroundColor: '#f8fafc', verticalAlign: 'top', fontSize: '12px' }}>
                    {`<Button 
  icon={<PlusIcon />} 
  iconPosition="left"
>
  Add Item
</Button>`}
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', verticalAlign: 'top' }}>
                    Button with icon on the left
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px', verticalAlign: 'top' }}>
                    <Button 
                      variant="secondary"
                      icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2"/></svg>}
                      iconPosition="right"
                    >
                      Next
                    </Button>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', backgroundColor: '#f8fafc', verticalAlign: 'top', fontSize: '12px' }}>
                    {`<Button 
  variant="secondary"
  icon={<ArrowIcon />} 
  iconPosition="right"
>
  Next
</Button>`}
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', verticalAlign: 'top' }}>
                    Button with icon on the right
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px', verticalAlign: 'top' }}>
                    <Button 
                      icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/></svg>}
                    />
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', backgroundColor: '#f8fafc', verticalAlign: 'top', fontSize: '12px' }}>
                    {`<Button icon={<SearchIcon />} />`}
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', verticalAlign: 'top' }}>
                    Icon-only button (perfectly centered)
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', verticalAlign: 'top' }}>
                    <Button 
                      loading 
                      icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2"/></svg>}
                    >
                      Loading
                    </Button>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', backgroundColor: '#f8fafc', verticalAlign: 'top', fontSize: '12px' }}>
                    {`<Button 
  loading 
  icon={<PlusIcon />}
>
  Loading
</Button>`}
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', verticalAlign: 'top' }}>
                    Loading state (spinner replaces icon)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h3>Advanced Configurations</h3>
          <div className="code-examples">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Example</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Code</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px', verticalAlign: 'top' }}>
                    <Button variant="success" fullWidth>Full Width</Button>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', backgroundColor: '#f8fafc', verticalAlign: 'top', fontSize: '12px' }}>
                    {`<Button variant="success" fullWidth>
  Full Width
</Button>`}
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', verticalAlign: 'top' }}>
                    Button that spans full container width
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px', verticalAlign: 'top' }}>
                    <Button 
                      variant="warning" 
                      size="sm"
                      onClick={() => alert('Clicked!')}
                    >
                      Click Me
                    </Button>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', backgroundColor: '#f8fafc', verticalAlign: 'top', fontSize: '12px' }}>
                    {`<Button 
  variant="warning" 
  size="sm"
  onClick={() => alert('Clicked!')}
>
  Click Me
</Button>`}
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', verticalAlign: 'top' }}>
                    Button with click handler
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', verticalAlign: 'top' }}>
                    <Button 
                      type="submit" 
                      variant="primary"
                      className="custom-class"
                    >
                      Submit Form
                    </Button>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', backgroundColor: '#f8fafc', verticalAlign: 'top', fontSize: '12px' }}>
                    {`<Button 
  type="submit" 
  variant="primary"
  className="custom-class"
>
  Submit Form
</Button>`}
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', verticalAlign: 'top' }}>
                    Form submit button with custom class
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ButtonExamples;
