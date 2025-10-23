import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { OutfitProvider } from './contexts/OutfitContext.jsx'
import './index.css'

const rootEl = document.getElementById('root')
if (rootEl) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <OutfitProvider>
        <App />
      </OutfitProvider>
    </React.StrictMode>
  )
}

