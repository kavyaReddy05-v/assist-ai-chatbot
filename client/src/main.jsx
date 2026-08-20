import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ChatConfigProvider } from './context/ChatConfigContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChatConfigProvider>
        <App />
      </ChatConfigProvider>
    </BrowserRouter>
  </StrictMode>,
)