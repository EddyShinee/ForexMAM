import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'
import './i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: { background: '#16202c', color: '#fff', border: '1px solid #2d3e50' },
        success: { style: { background: '#22c55e' } },
        error: { style: { background: '#ef4444' } },
      }}
    />
  </StrictMode>,
)
