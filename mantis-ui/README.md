# Mantis UI

A powerful and lightweight React component library designed for building internal websites with minimal effort.

## Features

- 🎨 **Beautiful Components**: Pre-designed components with modern aesthetics
- 🎯 **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- 🎨 **Customizable**: Easy to customize with CSS variables
- 📱 **Responsive**: Mobile-first responsive design
- ⚡ **Lightweight**: Minimal bundle size with tree-shaking support
- 🎭 **Animations**: Built-in animations and transitions

## Components

### Core Components

- **Button** - Versatile button component with multiple variants and states
- **Card** - Flexible container component with header/footer support
- **Sidebar** - Collapsible navigation sidebar with nested menu support
- **Table** - Feature-rich data table with sorting and custom rendering
- **Animation** - Wrapper component for adding smooth animations

## Installation

```bash
npm install mantis-ui
```

## Quick Start

```tsx
import React from 'react';
import { Button, Card } from 'mantis-ui';

function App() {
  return (
    <Card>
      <h2>Welcome to Mantis UI</h2>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}

export default App;
```

## Documentation

### Button

```tsx
import { Button } from 'mantis-ui';

// Basic usage
<Button variant="primary">Click me</Button>

// With loading state
<Button loading={isLoading}>Submit</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Card

```tsx
import { Card } from 'mantis-ui';

// Basic card
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>

// Card with header and footer
<Card 
  header={<h3>Header</h3>}
  footer={<Button>Action</Button>}
>
  Card content
</Card>
```

### Sidebar

```tsx
import { Sidebar } from 'mantis-ui';

const items = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    isActive: true
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />
  }
];

<Sidebar 
  items={items}
  collapsible
  header={<h2>My App</h2>}
/>
```

### Table

```tsx
import { Table } from 'mantis-ui';

const columns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name'
  },
  {
    key: 'age',
    title: 'Age',
    dataIndex: 'age'
  }
];

const data = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 }
];

<Table columns={columns} dataSource={data} />
```

### Animation

```tsx
import { Animation } from 'mantis-ui';

// Fade in animation
<Animation type="fadeIn">
  <div>This will fade in</div>
</Animation>

// Trigger on scroll
<Animation type="slideInUp" triggerOnScroll>
  <Card>This will slide up when scrolled into view</Card>
</Animation>
```

## Customization

Mantis UI uses CSS variables for easy customization. Override these variables in your CSS:

```css
:root {
  --mantis-primary: #your-primary-color;
  --mantis-secondary: #your-secondary-color;
  --mantis-font-family: 'Your Font Family';
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## License

MIT License - see LICENSE file for details.

## Support

For support and questions, please reach out to the NeoVantis team.
