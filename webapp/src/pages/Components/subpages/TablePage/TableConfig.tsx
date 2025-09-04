import { Card } from 'mantis-ui';

const TableConfig = () => {
  return (
    <div className="showcase-section" style={{ marginTop: '3rem' }}>
      <h2>Configuration Options</h2>
      <p>Learn how to configure the Table component with different options.</p>
      
      <Card>
        <h3>Basic Usage</h3>
        <div style={{ 
          backgroundColor: '#f1f5f9', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          fontFamily: 'monospace',
          fontSize: '0.875rem'
        }}>
          {`import { Table } from 'mantis-ui';

const columns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
  }
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

<Table
  columns={columns}
  dataSource={data}
  hoverable
  striped
  responsive
  onRowClick={(record) => console.log(record)}
/>`}
        </div>
      </Card>
    </div>
  );
};

export default TableConfig;
