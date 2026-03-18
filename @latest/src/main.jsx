import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { OutfitProvider } from './contexts/OutfitContext.jsx'
import { AuthProvider } from './hooks/UseAuth.jsx'
import { ProductsProvider } from './contexts/ProductsContext.jsx'
import { AdminProvider } from './contexts/AdminContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import './index.css'

const rootEl = document.getElementById('root')
if (rootEl) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <AuthProvider>
        <ProductsProvider>
        <AdminProvider>
          <CartProvider>
            <OutfitProvider>
              <App />
            </OutfitProvider>
          </CartProvider>
        </AdminProvider>
        </ProductsProvider>
      </AuthProvider>
    </React.StrictMode>
  )
}
