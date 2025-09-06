# 🦎 Mantis UI

[![npm version](https://img.shields.io/npm/v/@neovantis/mantisui.svg)](https://www.npmjs.com/package/@neovantis/mantisui)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**A powerful and lightweight React UI component library for internal dashboards and business applications**

## 📦 Quick Links

- **📚 [Full Documentation](./mantis-ui/README.md)**
- **📦 [NPM Package](https://www.npmjs.com/package/@neovantis/mantisui)**
- **🎮 [Live Demo](https://neovantis.github.io/mantis)**
- **🐛 [Report Issues](https://github.com/NeoVantis/mantis/issues)**

## 🚀 Quick Start

```bash
npm install @neovantis/mantisui
```

```tsx
import { Button, Card, Table, Sidebar } from '@neovantis/mantisui';
import '@neovantis/mantisui/styles';

function App() {
  return (
    <Card variant="elevated">
      <h1>Welcome to Mantis UI</h1>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```
│   │   ├── components/     # React Components
│   │   │   ├── Button/     # Button component with variants & states
│   │   │   ├── Card/       # Flexible card containers
│   │   │   ├── Sidebar/    # Collapsible navigation sidebar
│   │   │   ├── Table/      # Feature-rich data tables
│   │   │   └── Animation/  # Smooth animation wrapper
│   │   ├── styles/         # CSS Variables & Base styles
│   │   └── animations/     # Animation CSS classes
│   └── package.json
└── webapp/                 # Showcase Application
    ├── src/
    │   ├── App.tsx         # Main showcase app
    │   ├── main.tsx        # Entry point
    │   └── App.css         # Showcase styling
    ├── index.html
    ├── vite.config.ts      # Vite configuration
    └── package.json
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd mantis
   ```

2. **Install dependencies for the component library:**
   ```bash
   cd mantis-ui
   npm install
   ```

3. **Install dependencies for the showcase webapp:**
   ```bash
   cd ../webapp
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## 🎯 Components Overview

### Button Component
- **Variants:** Primary, Secondary, Success, Warning, Error, Ghost
- **Sizes:** Small, Medium, Large
- **States:** Default, Disabled, Loading
- **Features:** Click handlers, full-width option, custom styling

### Card Component
- **Variants:** Default, Outlined, Elevated, Interactive
- **Features:** Header, Footer, Hover effects, Click handlers
- **Padding:** Customizable spacing options

### Sidebar Component
- **Features:** Collapsible, Nested navigation, Icons
- **State Management:** Active state tracking
- **Responsive:** Works on all screen sizes

### Table Component
- **Features:** Sorting, Custom rendering, Responsive design
- **Styling:** Hoverable rows, Striped rows, Custom column widths
- **Events:** Row click handlers

### Animation Component
- **Types:** FadeIn, SlideIn (all directions), ScaleIn, Bounce, Pulse, Spin
- **Features:** Configurable duration, delay, scroll triggers
- **Performance:** CSS-based animations for smooth performance

## 🎨 Design System

### CSS Variables
The component library uses CSS custom properties for consistent theming:

```css
:root {
  /* Colors */
  --mantis-primary: #2563eb;
  --mantis-secondary: #64748b;
  --mantis-success: #059669;
  --mantis-warning: #d97706;
  --mantis-error: #dc2626;
  
  /* Spacing */
  --mantis-spacing-xs: 0.25rem;
  --mantis-spacing-sm: 0.5rem;
  --mantis-spacing-md: 1rem;
  --mantis-spacing-lg: 1.5rem;
  --mantis-spacing-xl: 2rem;
  
  /* Typography */
  --mantis-font-size-sm: 0.875rem;
  --mantis-font-size-base: 1rem;
  --mantis-font-size-lg: 1.125rem;
  
  /* Border Radius */
  --mantis-radius-sm: 0.25rem;
  --mantis-radius-md: 0.375rem;
  --mantis-radius-lg: 0.5rem;
}
```

## 🔧 Development

### Project Architecture

This project follows a monorepo structure with two main packages:

1. **mantis-ui**: The core component library
2. **webapp**: Showcase application demonstrating the components

### Development Workflow

1. **Component Development:**
   - Create new components in `mantis-ui/src/components/`
   - Each component should have its own folder with `.tsx`, `.css`, and `index.ts` files
   - Import CSS directly in the component file
   - Export the component from `mantis-ui/src/index.ts`

2. **Testing Components:**
   - Add component examples to the showcase webapp
   - Update the sidebar navigation in `webapp/src/App.tsx`
   - Create demonstration pages for new components

3. **Styling Guidelines:**
   - Use CSS custom properties for theming
   - Follow BEM naming convention for CSS classes
   - Ensure components are responsive
   - Test across different browsers

### File Structure for New Components

```
ComponentName/
├── ComponentName.tsx       # React component
├── ComponentName.css       # Component styles
└── index.ts               # Export file
```

Example component template:
```tsx
// ComponentName.tsx
import React from 'react';
import './ComponentName.css';

export interface ComponentNameProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  children,
  variant = 'default',
  size = 'md',
  ...props
}) => {
  return (
    <div 
      className={`mantis-component mantis-component--${variant} mantis-component--${size}`}
      {...props}
    >
      {children}
    </div>
  );
};
```

### Adding New Components

1. Create the component folder in `mantis-ui/src/components/`
2. Implement the component with TypeScript interfaces
3. Add CSS styles using CSS custom properties
4. Export from `mantis-ui/src/index.ts`
5. Add to the showcase webapp for demonstration
6. Update documentation

## 📦 Building for Production

### Building the Component Library
```bash
cd mantis-ui
npm run build
```

### Building the Showcase App
```bash
cd webapp
npm run build
```

## 🚀 Deployment Manual

### Component Library Deployment

#### Option 1: NPM Registry (Recommended for Production)

1. **Prepare the Library for Publishing:**
   ```bash
   cd mantis-ui
   npm run build
   ```

2. **Update Version (if needed):**
   ```bash
   npm version patch  # For bug fixes
   npm version minor  # For new features
   npm version major  # For breaking changes
   ```

3. **Login to NPM:**
   ```bash
   npm login
   ```

4. **Publish to NPM:**
   ```bash
   npm publish
   ```

5. **Install in Other Projects:**
   ```bash
   npm install mantis-ui
   ```

#### Option 2: Private NPM Registry

1. **Configure Private Registry:**
   ```bash
   npm config set registry https://your-private-registry.com
   ```

2. **Follow steps 1-4 from Option 1**

#### Option 3: Git-based Installation

1. **Tag a Release:**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **Install from Git in Other Projects:**
   ```bash
   npm install git+https://github.com/your-org/mantis-ui.git#v1.0.0
   ```

#### Option 4: Local Development/Testing

1. **Create Symlink (in mantis-ui directory):**
   ```bash
   cd mantis-ui
   npm link
   ```

2. **Link in Target Project:**
   ```bash
   cd your-project
   npm link mantis-ui
   ```

### Showcase Webapp Deployment

#### Option 1: Vercel (Recommended for Frontend)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Build and Deploy:**
   ```bash
   cd webapp
   npm run build
   vercel --prod
   ```

3. **Configure vercel.json (if needed):**
   ```json
   {
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/static-build",
         "config": { "distDir": "dist" }
       }
     ],
     "routes": [
       { "handle": "filesystem" },
       { "src": "/(.*)", "dest": "/index.html" }
     ]
   }
   ```

#### Option 2: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy:**
   ```bash
   cd webapp
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **Configure _redirects (for SPA routing):**
   ```
   /*    /index.html   200
   ```

#### Option 3: GitHub Pages

1. **Install gh-pages:**
   ```bash
   cd webapp
   npm install --save-dev gh-pages
   ```

2. **Add Deploy Script to package.json:**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Configure vite.config.ts for GitHub Pages:**
   ```typescript
   export default defineConfig({
     base: '/mantis/',  // Replace with your repo name
     // ... other config
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

#### Option 4: Docker Deployment

1. **Create Dockerfile (in webapp directory):**
   ```dockerfile
   # Build stage
   FROM node:18-alpine as builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   # Production stage
   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create nginx.conf:**
   ```nginx
   events {
     worker_connections 1024;
   }

   http {
     include /etc/nginx/mime.types;
     
     server {
       listen 80;
       server_name localhost;
       root /usr/share/nginx/html;
       index index.html;
       
       location / {
         try_files $uri $uri/ /index.html;
       }
     }
   }
   ```

3. **Build and Run Docker Container:**
   ```bash
   cd webapp
   docker build -t mantis-showcase .
   docker run -p 8080:80 mantis-showcase
   ```

#### Option 5: Traditional Server (Apache/Nginx)

1. **Build the Application:**
   ```bash
   cd webapp
   npm run build
   ```

2. **Upload dist/ folder to your server**

3. **Configure Apache (.htaccess):**
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

4. **Configure Nginx:**
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;
     root /path/to/dist;
     index index.html;
     
     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

### Environment-Specific Configurations

#### Production Environment Variables

1. **Create .env.production (in webapp directory):**
   ```
   VITE_API_URL=https://api.yourdomain.com
   VITE_APP_TITLE=Mantis UI - Production
   VITE_ANALYTICS_ID=your-analytics-id
   ```

2. **Update vite.config.ts for different environments:**
   ```typescript
   export default defineConfig(({ mode }) => {
     const env = loadEnv(mode, process.cwd(), '');
     
     return {
       define: {
         __APP_ENV__: JSON.stringify(env.NODE_ENV),
       },
       // ... other config based on environment
     };
   });
   ```

### CI/CD Pipeline Examples

#### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Mantis UI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install Library Dependencies
      run: |
        cd mantis-ui
        npm ci
    
    - name: Build Library
      run: |
        cd mantis-ui
        npm run build
    
    - name: Install Webapp Dependencies
      run: |
        cd webapp
        npm ci
    
    - name: Build Webapp
      run: |
        cd webapp
        npm run build
    
    - name: Deploy to Vercel
      if: github.ref == 'refs/heads/main'
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: webapp
```

### Pre-Deployment Checklist

#### Component Library:
- [ ] All components have proper TypeScript types
- [ ] CSS files are properly imported
- [ ] Build completes without errors
- [ ] Version number is updated in package.json
- [ ] README is up to date
- [ ] All exports are included in src/index.ts

#### Showcase Webapp:
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Components render properly
- [ ] Build completes without warnings
- [ ] Environment variables are configured
- [ ] Routes work correctly (for SPA)
- [ ] Performance is acceptable (run `npm run build` and check bundle size)

### Post-Deployment Verification

1. **Component Library:**
   ```bash
   # Test installation in a new project
   mkdir test-mantis && cd test-mantis
   npm init -y
   npm install mantis-ui
   ```

2. **Showcase Webapp:**
   - [ ] Visit deployed URL
   - [ ] Test all navigation links
   - [ ] Verify all components display correctly
   - [ ] Check browser console for errors
   - [ ] Test on different devices/browsers

### Troubleshooting Common Issues

#### Build Issues:
- **CSS not loading:** Ensure CSS imports are in the correct order
- **Module not found:** Check relative paths and file extensions
- **TypeScript errors:** Verify all types are properly exported

#### Deployment Issues:
- **404 on refresh:** Configure server for SPA routing
- **Blank page:** Check browser console and ensure base URL is correct
- **Components not styled:** Verify CSS files are included in build

### Monitoring and Maintenance

1. **Set up monitoring** for the deployed webapp
2. **Monitor NPM downloads** for the component library
3. **Regular security updates:** `npm audit` and update dependencies
4. **Performance monitoring:** Use tools like Lighthouse
5. **User feedback:** Monitor issues and feature requests

---

## 🚀 Usage in External Projects

Once the component library is published, you can use it in other projects:

```bash
npm install mantis-ui
```

```tsx
import { Button, Card, Table } from 'mantis-ui';

function MyApp() {
  return (
    <Card variant="elevated">
      <h2>Welcome to My App</h2>
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </Card>
  );
}
```

## 🎨 Customization

### Theming
Override CSS custom properties to customize the design system:

```css
:root {
  --mantis-primary: #your-brand-color;
  --mantis-secondary: #your-secondary-color;
  /* ... other variables */
}
```

### Component Customization
All components accept standard HTML attributes and can be styled with custom CSS classes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-component`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add new component'`
5. Push to the branch: `git push origin feature/new-component`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏢 NeoVantis

Built with ❤️ by the NeoVantis team for internal website development.

---

For questions or support, please reach out to the development team.
