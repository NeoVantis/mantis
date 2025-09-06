# 🦎 Mantis UI

> **A powerful and lightweight React component library built for internal dashboards and business applications**

[![npm version](https://img.shields.io/npm/v/@neovantis/mantisui.svg)](https://www.npmjs.com/package/@neovantis/mantisui)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@neovantis/mantisui)](https://bundlephobia.com/package/@neovantis/mantisui)

---

## ✨ Why Mantis UI?

Built by **NeoVantis** for the modern web, Mantis UI delivers production-ready components that help you build stunning internal tools and dashboards **fast**. No bloat, no complexity – just beautiful, accessible components that work.

### 🚀 **Quick Start**

```bash
npm install @neovantis/mantisui
```

```tsx
import { Button, Card, Table, Sidebar } from '@neovantis/mantisui';
import '@neovantis/mantisui/styles';

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar items={navItems} collapsible />
      <main>
        <Card variant="elevated">
          <h1>Revenue Overview</h1>
          <Table columns={columns} dataSource={salesData} />
          <Button variant="primary" size="lg">
            Generate Report
          </Button>
        </Card>
      </main>
    </div>
  );
}
```

---

## 🎯 **What's Inside**

### **🔘 Buttons** - *6 variants, 3 sizes, icons, loading states*
```tsx
<Button variant="primary" loading={isSubmitting}>
  Save Changes
</Button>
<Button variant="ghost" icon={<DownloadIcon />}>
  Export Data
</Button>
```

### **📄 Cards** - *Flexible containers with headers, footers, variants*
```tsx
<Card variant="elevated" header="User Analytics">
  <StatGrid data={metrics} />
</Card>
```

### **📊 Tables** - *Sortable, customizable, responsive data tables*
```tsx
<Table 
  columns={[
    { key: 'name', title: 'Employee', dataIndex: 'name', sortable: true },
    { key: 'status', title: 'Status', render: (status) => <StatusBadge status={status} /> }
  ]}
  dataSource={employees}
  onRowClick={(record) => openProfile(record.id)}
/>
```

### **📑 Sidebar** - *Collapsible navigation with nested menus*
```tsx
<Sidebar 
  items={navigationItems}
  collapsible 
  header={<Logo />}
  footer={<UserProfile />}
/>
```

### **✨ Animations** - *Smooth, performant CSS animations*
```tsx
<Animation type="fadeInUp" triggerOnScroll>
  <MetricsCard />
</Animation>
```

---

## 🎨 **Design System**

Mantis UI follows a cohesive design language with:

- **🎯 Consistent spacing** - 8px grid system
- **🌈 Smart color palette** - Primary, secondary, success, warning, error variants
- **📱 Mobile-first** - Responsive by default
- **♿ Accessible** - WCAG 2.1 AA compliant
- **🎭 Smooth animations** - Subtle, performant transitions

### **Customization Made Easy**

```css
:root {
  --mantis-primary: #3b82f6;
  --mantis-radius: 8px;
  --mantis-font-family: 'Inter', sans-serif;
  --mantis-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

---

## 📦 **Real-World Example**

Here's how companies use Mantis UI to build internal tools:

```tsx
function EmployeeDashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { 
      key: 'name', 
      title: 'Employee', 
      dataIndex: 'name',
      sortable: true 
    },
    { 
      key: 'department', 
      title: 'Department', 
      dataIndex: 'department' 
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <span className={`status status--${status.toLowerCase()}`}>
          {status}
        </span>
      )
    }
  ];

  return (
    <div className="app">
      <Sidebar 
        items={[
          { id: 'dashboard', label: 'Dashboard', icon: '📊' },
          { id: 'employees', label: 'Employees', icon: '👥', isActive: true },
          { id: 'reports', label: 'Reports', icon: '📈' }
        ]}
        collapsible
      />
      
      <main className="main-content">
        <Card variant="elevated">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Employee Directory</h1>
            <Button variant="primary" icon="+" loading={loading}>
              Add Employee
            </Button>
          </div>
          
          <Table 
            columns={columns}
            dataSource={employees}
            onRowClick={(employee) => openEmployeeProfile(employee.id)}
          />
        </Card>
      </main>
    </div>
  );
}
```

---

## 🏗️ **Architecture**

- **⚡ Tree-shakeable** - Import only what you need
- **📦 Tiny bundle** - <30kb gzipped for the full library
- **🔧 TypeScript** - Complete type definitions included
- **🎨 CSS Variables** - Easy theming without build tools
- **📱 Responsive** - Works beautifully on all devices

---

## 🌟 **Community**

- **🐛 Issues**: [GitHub Issues](https://github.com/NeoVantis/mantis/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/NeoVantis/mantis/discussions)
- **📖 Documentation**: [Full Docs](https://neovantis.github.io/mantis)
- **💬 Support**: [NeoVantis Team](mailto:support@neovantis.com)

---

## 📄 **License**

MIT © [NeoVantis](https://github.com/NeoVantis)

---

<div align="center">

**Built with ❤️ by the NeoVantis team**

[⭐ Star on GitHub](https://github.com/NeoVantis/mantis) • [📦 View on npm](https://www.npmjs.com/package/@neovantis/mantisui) • [🔗 Visit NeoVantis](https://neovantis.com)

</div>