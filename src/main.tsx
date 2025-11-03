import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { CartProvider } from './contexts/CartContext'
import { AdminProvider } from './contexts/AdminContext'
import { Toaster } from './components/ui/sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AdminProvider>
          <AuthProvider>
            <CartProvider>
              <App />
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </AdminProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
