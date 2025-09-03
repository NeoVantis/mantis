import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ResponsiveProvider } from 'mantis-ui'

// Import base Mantis UI styles for CSS variables
import '../../mantis-ui/src/styles/base.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ResponsiveProvider>
      <App />
    </ResponsiveProvider>
  </React.StrictMode>,
)
