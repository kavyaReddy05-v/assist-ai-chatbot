import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DesignerPage from './pages/DesignerPage'
import { ChatConfigProvider } from './context/ChatConfigContext'
import ChatWidget from './components/ChatWidget'
import './App.css'

function WidgetOnlyPage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ChatWidget standalone={true} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ChatConfigProvider>
              <DesignerPage />
            </ChatConfigProvider>
          }
        />
        <Route
          path="/widget"
          element={
            <ChatConfigProvider>
              <WidgetOnlyPage />
            </ChatConfigProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App