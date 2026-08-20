import { Routes, Route, Link } from 'react-router-dom'
import DesignerPage from './pages/DesignerPage'
import ChatPage from './pages/ChatPage'
import './App.css'

function App() {
  return (
    <div>
      <nav className="top-nav">
        <Link to="/">Designer</Link>
        <Link to="/chat">Chat Preview</Link>
      </nav>

      <Routes>
        <Route path="/" element={<DesignerPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  )
}

export default App