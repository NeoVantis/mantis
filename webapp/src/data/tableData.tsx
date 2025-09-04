import { TableColumn } from 'mantis-ui';

// Sample data for the table
export const tableData = [
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
export const tableColumns: TableColumn<typeof tableData[0]>[] = [
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
