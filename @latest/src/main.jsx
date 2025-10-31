import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { OutfitProvider } from './contexts/OutfitContext.jsx'
import { AuthProvider } from './hooks/UseAuth.jsx'
import './index.css'

const rootEl = document.getElementById('root')
if (rootEl) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <AuthProvider>
        <OutfitProvider>
          <App />
        </OutfitProvider>
      </AuthProvider>
    </React.StrictMode>
  )
}

