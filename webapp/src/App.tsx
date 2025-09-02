import { useState } from 'react';
import { 
  Button, 
  Card, 
  Sidebar, 
  Table, 
  Animation,
  SidebarItem,
  TableColumn 
} from 'mantis-ui';
import './App.css';

// Sample data for the table
const tableData = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Software Engineer',
    department: 'Engineering',
    status: 'Active',
    email: 'john.doe@company.com'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Product Manager',
    department: 'Product',
    status: 'Active',
    email: 'jane.smith@company.com'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Designer',
    department: 'Design',
    status: 'Away',
    email: 'mike.johnson@company.com'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    role: 'Data Analyst',
    department: 'Analytics',
    status: 'Active',
    email: 'sarah.wilson@company.com'
  }
];

// Table columns configuration
const tableColumns: TableColumn<typeof tableData[0]>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
  },
  {
    key: 'department',
    title: 'Department',
    dataIndex: 'department',
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (status: string) => (
      <span 
        style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          fontSize: '0.75rem',
          fontWeight: '500',
          backgroundColor: status === 'Active' ? '#dcfce7' : '#fef3c7',
          color: status === 'Active' ? '#166534' : '#92400e',
        }}
      >
        {status}
      </span>
    ),
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
  },
];

// Sidebar navigation items
const getSidebarItems = (handleClick: (id: string) => void, currentPage: string): SidebarItem[] => [
  {
    id: 'dashboard',
    label: 'Dashboard',
    isActive: currentPage === 'dashboard',
    onClick: () => handleClick('dashboard'),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
        <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
        <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
        <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
      </svg>
    ),
  },
  {
    id: 'components',
    label: 'Components',
    isActive: currentPage === 'components',
    onClick: () => handleClick('components'),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="6" height="6" stroke="currentColor" strokeWidth="2" rx="2"/>
        <rect x="14" y="4" width="6" height="6" stroke="currentColor" strokeWidth="2" rx="2"/>
        <rect x="4" y="14" width="6" height="6" stroke="currentColor" strokeWidth="2" rx="2"/>
        <rect x="14" y="14" width="6" height="6" stroke="currentColor" strokeWidth="2" rx="2"/>
      </svg>
    ),
    children: [
      { 
        id: 'buttons', 
        label: 'Buttons',
        onClick: () => handleClick('buttons')
      },
      { 
        id: 'cards', 
        label: 'Cards',
        onClick: () => handleClick('cards')
      },
      { 
        id: 'tables', 
        label: 'Tables',
        onClick: () => handleClick('tables')
      },
    ],
  },
  {
    id: 'animations',
    label: 'Animations',
    isActive: currentPage === 'animations',
    onClick: () => handleClick('animations'),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    isActive: currentPage === 'settings',
    onClick: () => handleClick('settings'),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
];

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLoadingDemo = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2000);
  };

  const handleSidebarItemClick = (itemId: string) => {
    setCurrentPage(itemId);
    console.log('Navigated to:', itemId);
  };

  const sidebarItems = getSidebarItems(handleSidebarItemClick, currentPage);

  // Render different content based on current page
  const renderPageContent = () => {
    console.log('🔥 renderPageContent called with currentPage:', currentPage);
    
    switch (currentPage) {
      case 'dashboard':
        return (
          <>
            <div className="showcase-header">
              <h1>Mantis UI Showcase</h1>
              <p>A powerful and lightweight component library for internal websites</p>
            </div>

            <div className="showcase-section">
              <h2>Welcome to Mantis UI</h2>
              <p>Explore our comprehensive component library designed for building beautiful internal websites with minimal effort.</p>
              
              <div className="showcase-grid showcase-grid--3">
                <Card variant="elevated" onClick={() => handleSidebarItemClick('buttons')}>
                  <h3 style={{ margin: '0 0 1rem 0' }}>Buttons</h3>
                  <p style={{ margin: 0, color: '#64748b' }}>
                    Versatile button components with multiple variants and states.
                  </p>
                </Card>
                
                <Card variant="elevated" onClick={() => handleSidebarItemClick('cards')}>
                  <h3 style={{ margin: '0 0 1rem 0' }}>Cards</h3>
                  <p style={{ margin: 0, color: '#64748b' }}>
                    Flexible card containers for organizing content.
                  </p>
                </Card>
                
                <Card variant="elevated" onClick={() => handleSidebarItemClick('tables')}>
                  <h3 style={{ margin: '0 0 1rem 0' }}>Tables</h3>
                  <p style={{ margin: 0, color: '#64748b' }}>
                    Feature-rich data tables with sorting and filtering.
                  </p>
                </Card>
              </div>
            </div>

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
          </>
        );

      case 'buttons':
        return (
          <div className="showcase-section">
            <h1>Buttons</h1>
            <p>Versatile button components with multiple variants, sizes, and states.</p>
            
            <div className="showcase-grid showcase-grid--2">
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
              
              <div className="showcase-demo-card">
                <h3>Button Sizes & States</h3>
                <div className="showcase-buttons-demo">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button disabled>Disabled</Button>
                  <Button loading={buttonLoading} onClick={handleLoadingDemo}>
                    {buttonLoading ? 'Loading...' : 'Click to Load'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cards':
        return (
          <div className="showcase-section">
            <h1>Cards</h1>
            <p>Flexible card containers with headers, footers, and interactive states.</p>
            
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
          </div>
        );

      case 'tables':
        return (
          <div className="showcase-section">
            <h1>Data Tables</h1>
            <p>Feature-rich table component with sorting, custom rendering, and responsive design.</p>
            
            <Card>
              <Table
                columns={tableColumns}
                dataSource={tableData}
                hoverable
                striped
                responsive
                onRowClick={(record: any) => console.log('Row clicked:', record)}
              />
            </Card>
          </div>
        );

      case 'animations':
        return (
          <div className="showcase-section">
            <h1>Animations</h1>
            <p>Smooth animations to enhance user experience and provide visual feedback.</p>
            
            <div className="showcase-grid showcase-grid--2">
              <div className="showcase-demo-card">
                <h3>Entrance Animations</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Animation type="fadeIn" duration={600}>
                    <Button variant="primary">Fade In Animation</Button>
                  </Animation>
                  
                  <Animation type="slideInRight" duration={800} delay={200}>
                    <Button variant="secondary">Slide In Right</Button>
                  </Animation>
                  
                  <Animation type="scaleIn" duration={500} delay={400}>
                    <Button variant="success">Scale In Animation</Button>
                  </Animation>
                </div>
              </div>
              
              <div className="showcase-demo-card">
                <h3>Interactive Animations</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Animation type="bounce" repeat>
                    <Button variant="warning">Bouncing Button</Button>
                  </Animation>
                  
                  <Animation type="pulse" repeat>
                    <Button variant="error">Pulsing Button</Button>
                  </Animation>
                  
                  <Animation type="spin" repeat>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: '#2563eb', 
                      borderRadius: '50%',
                      margin: '10px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ↻
                    </div>
                  </Animation>
                </div>
              </div>
            </div>
            
            <div className="showcase-grid showcase-grid--2" style={{ marginTop: '2rem' }}>
              <Animation type="slideInUp" triggerOnScroll>
                <Card>
                  <h3>Scroll Triggered Animation</h3>
                  <p>This card animates when it comes into view while scrolling.</p>
                </Card>
              </Animation>
              
              <Animation type="slideInLeft" triggerOnScroll delay={300}>
                <Card>
                  <h3>Delayed Scroll Animation</h3>
                  <p>This card has a 300ms delay when triggered by scrolling.</p>
                </Card>
              </Animation>
            </div>
            
            <Card style={{ marginTop: '2rem' }}>
              <h3>Animation Component Usage</h3>
              <p>Animations are now fully functional! Here's how to use them:</p>
              <div style={{ 
                backgroundColor: '#f1f5f9', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                fontFamily: 'monospace',
                fontSize: '0.875rem'
              }}>
                {`<Animation type="fadeIn" duration={600} delay={200}>
  <YourComponent />
</Animation>

// Scroll-triggered animation
<Animation type="slideInUp" triggerOnScroll>
  <Card>Your content</Card>
</Animation>

// Repeating animation
<Animation type="pulse" repeat>
  <Button>Pulsing button</Button>
</Animation>`}
              </div>
            </Card>
          </div>
        );

      case 'components':
        return (
          <>
            <div className="showcase-header">
              <h1>Components Overview</h1>
              <p>Explore all available components in the Mantis UI library</p>
            </div>
            
            <div className="showcase-section">
              <div className="showcase-grid showcase-grid--3">
                <Card variant="elevated" onClick={() => handleSidebarItemClick('buttons')}>
                  <h3 style={{ margin: '0 0 1rem 0' }}>Buttons</h3>
                  <p style={{ margin: 0, color: '#64748b' }}>
                    Primary, secondary, success, warning, error, and ghost variants
                  </p>
                </Card>
                
                <Card variant="elevated" onClick={() => handleSidebarItemClick('cards')}>
                  <h3 style={{ margin: '0 0 1rem 0' }}>Cards</h3>
                  <p style={{ margin: 0, color: '#64748b' }}>
                    Default, outlined, elevated, and interactive card styles
                  </p>
                </Card>
                
                <Card variant="elevated" onClick={() => handleSidebarItemClick('tables')}>
                  <h3 style={{ margin: '0 0 1rem 0' }}>Tables</h3>
                  <p style={{ margin: 0, color: '#64748b' }}>
                    Sortable columns, custom rendering, and responsive design
                  </p>
                </Card>
              </div>
            </div>
          </>
        );

      case 'settings':
        return (
          <div className="showcase-section">
            <h1>Settings</h1>
            <p>Configure your Mantis UI preferences and options.</p>
            
            <Card>
              <h3 style={{ margin: '0 0 1rem 0' }}>Theme Configuration</h3>
              <p style={{ color: '#64748b', margin: '0 0 1.5rem 0' }}>
                Customize the appearance and behavior of Mantis UI components.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button variant="primary">Save Settings</Button>
                <Button variant="secondary">Reset to Default</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
            </Card>
            
            <Card style={{ marginTop: '2rem' }}>
              <h3 style={{ margin: '0 0 1rem 0' }}>Component Library Info</h3>
              <div style={{ 
                backgroundColor: '#f8fafc', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0'
              }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500' }}>Mantis UI v1.0.0</p>
                <p style={{ margin: '0 0 0.5rem 0', color: '#64748b' }}>Built for NeoVantis internal websites</p>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>
                  Components: Button, Card, Table, Sidebar, Animation
                </p>
              </div>
            </Card>
          </div>
        );

      default:
        return (
          <div className="showcase-section">
            <h1>Page Not Found</h1>
            <p>The requested page could not be found.</p>
          </div>
        );
    }
  };

  return (
    <div className="mantis-ui showcase-container">
      <Sidebar
        items={sidebarItems}
        collapsible
        collapsed={sidebarCollapsed}
        onCollapseChange={setSidebarCollapsed}
        header={
          <div>
            <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.25rem' }}>
              {sidebarCollapsed ? 'M' : 'Mantis UI'}
            </h3>
            {!sidebarCollapsed && (
              <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                Component Library
              </p>
            )}
          </div>
        }
        footer={
          !sidebarCollapsed && (
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              v1.0.0 • NeoVantis
            </div>
          )
        }
      />
      
      <main className="showcase-main">
        {renderPageContent()}
      </main>
    </div>
  );
}

export default App;
