# Mantis UI Showcase

A demonstration web application showcasing all the components and capabilities of the Mantis UI component library.

## Overview

This webapp serves as a comprehensive showcase for Mantis UI, demonstrating:

- All available components (Button, Card, Sidebar, Table, Animation)
- Different component variants and configurations
- Interactive examples and use cases
- Real-world implementation patterns
- Best practices for using Mantis UI

## Features Demonstrated

### Components Showcase
- **Buttons**: All variants, sizes, and states including loading states
- **Cards**: Different card types with headers, footers, and interactions
- **Sidebar**: Collapsible navigation with nested menus
- **Table**: Data table with sorting, custom rendering, and responsive design
- **Animations**: Various animation types including scroll-triggered animations

### Interactive Features
- Collapsible sidebar navigation
- Interactive button demonstrations
- Clickable cards and table rows
- Real-time animation previews
- Responsive design examples

## Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mantis/webapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
webapp/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles and showcase styling
│   └── vite-env.d.ts    # Vite type definitions
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md           # This file
```

## Key Features

### Minimal Code Approach
This webapp demonstrates how Mantis UI enables building rich interfaces with minimal code:

- Clean, declarative component usage
- Minimal custom styling required
- Built-in responsive behavior
- Automatic accessibility features

### Real-World Examples
- Employee data table with status indicators
- Navigation sidebar with collapsible sections
- Interactive dashboard cards
- Loading states and user feedback
- Smooth animations and transitions

### Responsive Design
The showcase is fully responsive and demonstrates how Mantis UI components adapt to different screen sizes:

- Mobile-first design approach
- Responsive table layouts
- Collapsible sidebar on mobile
- Touch-friendly interactions

## Technology Stack

- **React 18** - Component framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Mantis UI** - Component library
- **CSS3** - Styling and animations

## Development Notes

### Component Integration
The webapp shows how to integrate Mantis UI components:

```tsx
import { Button, Card, Sidebar, Table, Animation } from 'mantis-ui';

// Components work together seamlessly
<Card>
  <Table columns={columns} dataSource={data} />
  <Button variant="primary">Action</Button>
</Card>
```

### Customization Examples
Demonstrates various customization approaches:

- CSS variable overrides
- Custom component styling
- Theme integration
- Animation configurations

### Performance Optimizations
- Tree-shaking enabled
- Component lazy loading
- Optimized bundle size
- Efficient re-renders

## Deployment

To deploy the showcase:

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting platform

The build is optimized and ready for production deployment.

## Contributing

This showcase serves as both a demo and a development tool. When adding new components to Mantis UI:

1. Add component demonstrations to `App.tsx`
2. Update the showcase sections
3. Include interactive examples
4. Test responsive behavior

## License

MIT License - see LICENSE file for details.


test 