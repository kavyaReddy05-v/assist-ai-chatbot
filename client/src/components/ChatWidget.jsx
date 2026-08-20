import ReactMarkdown from 'react-markdown'
import { useState, useRef, useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { useChatConfig } from '../context/ChatConfigContext'
import './ChatWidget.css'

function ChatWidget() {
  const { config } = useChatConfig()

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages')
    return saved ? JSON.parse(saved) : [{ sender: 'bot', text: config.welcomeMessage }]
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(config.initialState === 'open')
  const [selectedFile, setSelectedFile] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const fileInputRef = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setSelectedFile({
        name: file.name,
        isImage: file.type.startsWith('image/'),
        preview: file.type.startsWith('image/') ? reader.result : null,
        data: reader.result.split(',')[1],
        mimeType: file.type
      })
    }
    reader.readAsDataURL(file)
  }

  const removeFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const onEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji)
    setShowEmojiPicker(false)
  }

  const sendMessage = async () => {
    if (!input.trim() && !selectedFile) return

    const userMessage = {
      sender: 'user',
      text: input,
      imagePreview: selectedFile && selectedFile.isImage ? selectedFile.preview : null,
      fileName: selectedFile && !selectedFile.isImage ? selectedFile.name : null
    }
    setMessages((prev) => [...prev, userMessage])

    const bodyPayload = { message: input, history: messages }
    if (selectedFile) {
      bodyPayload.image = {
        data: selectedFile.data,
        mimeType: selectedFile.mimeType
      }
    }

    setInput('')
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    setLoading(true)

    try {
      const res = await fetch('https://assist-ai-chatbot-production.up.railway.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      })
      const data = await res.json()

      const botMessage = { sender: 'bot', text: data.reply || 'Something went wrong.' }
      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Could not reach server.' }])
    }

    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser. Try Chrome.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput((prev) => prev + transcript)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const sizeMap = {
    small: { width: 300, height: 460 },
    medium: { width: 380, height: 550 },
    large: { width: 440, height: 640 }
  }
  const dims = sizeMap[config.widgetSize] || sizeMap.medium

  const iconShapeMap = {
    circle: '50%',
    rounded: '16px',
    square: '4px'
  }

  const positionStyle = config.position === 'bottom-left'
    ? { left: 24, right: 'auto' }
    : { right: 24, left: 'auto' }

  if (!open) {
    return (
      <div
        className="chat-launcher"
        style={{
          ...positionStyle,
          background: config.primaryColor,
          borderRadius: iconShapeMap[config.iconShape] || '50%'
        }}
        onClick={() => setOpen(true)}
      >
        💬
      </div>
    )
  }

  return (
    <div
      className={`chat-container anim-${config.animation}`}
      style={{
        width: dims.width,
        height: dims.height,
        fontFamily: config.font,
        fontSize: config.fontSize,
        ...positionStyle,
        background: config.theme === 'dark' ? '#1e1e1e' : '#ffffff',
        color: config.theme === 'dark' ? '#ffffff' : '#000000'
      }}
    >
      <div className="chat-header" style={{ background: config.primaryColor }}>
        {config.logoUrl && <img src={config.logoUrl} alt="logo" className="chat-logo" />}
        <div className="header-text">
          <span className="header-name">{config.botName}</span>
          <span className="header-status">
            <span className="status-dot"></span>
            Active now
          </span>
        </div>
        <button className="close-btn" onClick={() => setOpen(false)}>×</button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.sender}`}
            style={msg.sender === 'user' ? { background: config.primaryColor } : {}}
          >
            {msg.imagePreview && (
              <img src={msg.imagePreview} alt="uploaded" className="uploaded-image" />
            )}
            {msg.fileName && (
              <div className="file-chip">📄 {msg.fileName}</div>
            )}
            {msg.text && <ReactMarkdown>{msg.text}</ReactMarkdown>}
          </div>
        ))}
        {loading && (
          <div className="message bot typing-bubble">
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {isListening && (
        <div className="listening-bar">
          <span className="wave-dot"></span>
          <span className="wave-dot"></span>
          <span className="wave-dot"></span>
          <span className="wave-dot"></span>
          <span className="wave-dot"></span>
          Listening...
        </div>
      )}

      {selectedFile && (
        <div className="image-preview-bar">
          {selectedFile.isImage ? (
            <img src={selectedFile.preview} alt="preview" />
          ) : (
            <span className="file-chip">📄 {selectedFile.name}</span>
          )}
          <button onClick={removeFile}>×</button>
        </div>
      )}

      {showEmojiPicker && (
        <div className="emoji-picker-wrapper">
          <EmojiPicker onEmojiClick={onEmojiClick} width="100%" height={300} />
        </div>
      )}

      <div className="chat-input">
        {config.attachmentsEnabled && (
          <>
            <button
              className="attach-btn"
              onClick={() => fileInputRef.current.click()}
              type="button"
              title="Attach a file"
            >
              📎
            </button>
            <input
              type="file"
              accept="image/*,.pdf"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </>
        )}
        {config.voiceEnabled && (
          <button
            className={`mic-btn ${isListening ? 'listening' : ''}`}
            onClick={startVoiceInput}
            type="button"
            title="Voice input"
          >
            🎤
          </button>
        )}
        {config.emojiEnabled && (
          <button
            className="emoji-btn"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            type="button"
            title="Emoji"
          >
            😊
          </button>
        )}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <button
          className={`send-btn ${input.trim() || selectedFile ? 'active' : ''}`}
          onClick={sendMessage}
          style={{ background: config.primaryColor }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatWidget