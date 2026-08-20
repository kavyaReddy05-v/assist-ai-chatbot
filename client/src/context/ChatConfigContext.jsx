import { createContext, useContext, useState, useEffect } from 'react'

const defaultConfig = {
  botName: 'Assist AI',
  logoUrl: '/assist-logo.svg',
  theme: 'light',
  primaryColor: '#49077e',
  font: 'Arial',
  fontSize: 14,
  widgetSize: 'medium',
  position: 'bottom-right',
  initialState: 'open',
  iconShape: 'circle',
  animation: 'fade',
  attachmentsEnabled: true,
  emojiEnabled: true,
  voiceEnabled: true,
  welcomeMessage: 'Hi! I am Assist AI. How can I help you today?'
}

const ChatConfigContext = createContext()

export function ChatConfigProvider({ children }) {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('chatConfig')
    return saved ? JSON.parse(saved) : defaultConfig
  })

  useEffect(() => {
    localStorage.setItem('chatConfig', JSON.stringify(config))
  }, [config])

  const updateConfig = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <ChatConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ChatConfigContext.Provider>
  )
}

export function useChatConfig() {
  return useContext(ChatConfigContext)
}