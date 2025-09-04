import { Button, Card } from 'mantis-ui';

export function SettingsPage() {
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
}
