# Mantis UI - React Component Library Monorepo

**ALWAYS follow these instructions first and only use search or bash commands when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Prerequisites & Setup
- Node.js v20+ and npm are already installed and working
- Repository contains two packages: `mantis-ui` (component library) and `webapp` (showcase application)

### Initial Setup & Build Process
Execute these commands in order for a fresh repository setup:

```bash
# 1. Install mantis-ui dependencies (takes ~3 seconds)
cd mantis-ui && npm install

# 2. Build the component library (takes ~3 seconds) 
# NEVER CANCEL: Wait for completion even if it seems slow
npm run build

# 3. Install webapp dependencies (takes ~3 seconds)
cd ../webapp && npm install

# 4. Type-check the webapp (takes ~2 seconds)
npm run type-check

# 5. Build the webapp (takes ~1 second)
npm run build
```

**CRITICAL BUILD NOTES:**
- **NEVER CANCEL builds** - they complete quickly (under 5 seconds each)
- Set timeouts to 60+ seconds for all build commands to be safe
- If builds fail, check TypeScript errors first, then dependency issues

## Running the Application

### Development Server
```bash
# Start the showcase webapp (runs on http://localhost:3000)
cd webapp && npm run dev
```
- **ALWAYS** wait for "ready in XXXms" message before accessing the application
- Opens automatically in browser or navigate to `http://localhost:3000`
- **NEVER CANCEL** - server starts in under 1 second

### Production Build Testing
```bash
# Build and preview production version
cd webapp && npm run build && npm run preview
```

## Validation & Testing

### Manual Testing Requirements
**ALWAYS run through these validation scenarios after making changes:**

1. **Navigate to http://localhost:3000** - Verify dashboard loads
2. **Test navigation** - Click sidebar items (Dashboard, Components, Animations, Settings)
3. **Test button functionality** - Go to Components > Buttons, click "Click to Load" button
4. **Test table interactions** - Go to Tables section, click on table rows
5. **Test responsive design** - Resize browser window
6. **Check browser console** - Verify no JavaScript errors

### TypeScript Validation
```bash
# ALWAYS run before committing changes
cd webapp && npm run type-check
cd ../mantis-ui && npm run build  # This also type-checks the library
```

### No Automated Tests
- **NO test suites exist** - rely on manual testing described above
- **NO linting commands** configured - TypeScript compilation provides error checking
- Jest is referenced in mantis-ui package.json but not configured

## Architecture & Key Files

### Component Library (mantis-ui/)
- **Build system**: Rollup with TypeScript
- **Entry point**: `src/index.ts`
- **Components**: Button, Card, Sidebar, Table, Animation
- **Output**: `dist/` directory with CommonJS and ESM builds
- **Key commands**: `npm run build`, `npm run dev` (watch mode)

### Showcase Application (webapp/)
- **Build system**: Vite with React
- **Entry point**: `src/main.tsx`
- **Main component**: `src/App.tsx`
- **Import alias**: `mantis-ui` points to `../mantis-ui/src/index.ts`
- **Key commands**: `npm run dev`, `npm run build`, `npm run type-check`

## Common Development Tasks

### Adding New Components
1. Create component in `mantis-ui/src/components/ComponentName/`
2. Include: `ComponentName.tsx`, `ComponentName.css`, `index.ts`
3. Export from `mantis-ui/src/index.ts`
4. Rebuild: `cd mantis-ui && npm run build`
5. Add demonstration to webapp in `App.tsx`
6. Test manually as described above

### Fixing Build Issues
- **Rollup errors**: Usually TypeScript type issues or missing CSS plugins
- **Import errors**: Check file paths and exports in `mantis-ui/src/index.ts`
- **Type errors**: Ensure proper TypeScript interfaces, especially for HTML props inheritance

### Known Working Configurations

#### mantis-ui Rollup Setup
```javascript
// rollup.config.js - WORKING configuration
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { defineConfig } from "rollup";
import ts from "typescript";

export default defineConfig({
  external: ["react", "react-dom", "react/jsx-runtime"],
  plugins: [
    postcss({ extract: true, minimize: true }),
    typescript({ typescript: ts, /* ... */ })
  ],
  // ...
});
```

#### TypeScript Path Mapping (webapp)
```json
// tsconfig.json - REQUIRED for local development
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "mantis-ui": ["../mantis-ui/src/index.ts"]
    }
  }
}
```

## Known Issues & Workarounds

### Security Audit False Positives
- `npm audit` reports critical vulnerability in "mantis-ui" - **IGNORE THIS**
- This is a false positive due to local package name conflict
- esbuild vulnerability is development-only, safe to ignore

### Import Requirements
- Components must extend React HTML types: `extends React.HTMLAttributes<HTMLDivElement>`
- Always include `react/jsx-runtime` in Rollup externals
- CSS imports require rollup-plugin-postcss

## File Structure Reference
```
mantis/
├── mantis-ui/              # Component Library
│   ├── src/
│   │   ├── components/     # Button, Card, Sidebar, Table, Animation
│   │   ├── styles/         # Base CSS variables
│   │   ├── animations/     # Animation CSS classes
│   │   └── index.ts        # Main export file
│   ├── dist/              # Built library output
│   ├── package.json       # Library dependencies
│   └── rollup.config.js   # Build configuration
└── webapp/                # Showcase Application
    ├── src/
    │   ├── App.tsx        # Main application with navigation
    │   ├── main.tsx       # React entry point
    │   └── App.css        # Application styles
    ├── dist/             # Built webapp output
    ├── package.json      # App dependencies
    └── vite.config.ts    # Vite configuration with alias
```

## Timing Expectations
- **mantis-ui install**: 3 seconds
- **mantis-ui build**: 3 seconds  
- **webapp install**: 3 seconds
- **webapp build**: 1 second
- **webapp dev server start**: 1 second
- **type-check**: 2 seconds

**CRITICAL**: Always wait for completion. NEVER CANCEL commands even if they seem slow.

## Success Indicators
- ✅ All builds complete without errors
- ✅ Dev server shows "ready in XXXms" message
- ✅ Application loads at http://localhost:3000
- ✅ Navigation between sections works
- ✅ Button interactions respond correctly
- ✅ Table rows are clickable and log to console
- ✅ No TypeScript errors in compilation
- ✅ No JavaScript errors in browser console

## Emergency Recovery
If builds are completely broken:
```bash
# Clean and reinstall everything
rm -rf mantis-ui/node_modules mantis-ui/dist
rm -rf webapp/node_modules webapp/dist
cd mantis-ui && npm install && npm run build
cd ../webapp && npm install && npm run type-check && npm run build
```