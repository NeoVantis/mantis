import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ResponsiveProvider } from 'mantis-ui'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ResponsiveProvider>
      <App />
    </ResponsiveProvider>
  </React.StrictMode>,
)
