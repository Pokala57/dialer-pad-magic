import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster 
      theme="dark" 
      position="top-right"
      toastOptions={{
        style: {
          background: 'hsl(222 84% 4.9%)',
          border: '1px solid hsl(280 100% 70% / 0.2)',
          color: 'hsl(210 40% 98%)',
        }
      }}
    />
  </StrictMode>,
)