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
            <p>Versatile button components with multiple variants, sizes, states, and icon support.</p>
            
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
            </div>

            {/* Usage Examples Section */}
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
            const animationTypes = [
              'fadeIn',
              'fadeOut',
              'slideInRight',
              'slideInLeft',
              'slideInUp',
              'slideInDown',
              'scaleIn',
              'bounce',
              'pulse',
              'spin',
            ] as const;
        return (
          <div className="showcase-section">
      <h1>Animations</h1>
      <p>Examples of all available animation types using the <code>{'<Animation />'}</code> component.</p>

      <div className="showcase-grid showcase-grid--2">
        {animationTypes.map((type) => (
          <div key={type} className="showcase-demo-card">
            <h3>{type}</h3>
            <Animation
              type={type}
              duration={800}
              easing="ease-out"
              repeat={type === 'bounce' || type === 'pulse' || type === 'spin'}
              triggerOnScroll={false}
            >
              <Button variant="primary">{type} Demo</Button>
            </Animation>
          </div>
        ))}
      </div>

      <Card style={{ marginTop: '2rem' }}>
        <h3>Usage Example</h3>
        <p>Use the <code>{'<Animation />'}</code> wrapper to animate any element:</p>
        <div
          style={{
            backgroundColor: '#f1f5f9',
            padding: '1rem',
            borderRadius: '0.5rem',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
          }}
        >
{`<Animation type="fadeIn" duration={600}>
  <YourComponent />
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
