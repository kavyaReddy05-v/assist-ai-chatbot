import { useState } from 'react'
import { useChatConfig } from '../context/ChatConfigContext'
import ChatWidget from '../components/ChatWidget'
import './DesignerPage.css'

function DesignerPage() {
  const { config, updateConfig } = useChatConfig()
  const [panelOpen, setPanelOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('appearance')

  return (
    <div className="designer-layout">
      <button
        className="panel-toggle"
        onClick={() => setPanelOpen((prev) => !prev)}
        aria-label="Toggle settings panel"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`designer-panel ${panelOpen ? 'open' : 'closed'}`}>
        <div className="panel-inner">
          <div className="panel-brand">
            <span className="brand-name">Assist AI</span>
            <span className="brand-subtitle">Settings</span>
          </div>

          <div className="tab-switcher">
            <button
              className={activeTab === 'appearance' ? 'active' : ''}
              onClick={() => setActiveTab('appearance')}
            >
              Appearance
            </button>
            <button
              className={activeTab === 'layout' ? 'active' : ''}
              onClick={() => setActiveTab('layout')}
            >
              Layout
            </button>
            <button
              className={activeTab === 'features' ? 'active' : ''}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
          </div>

          {activeTab === 'appearance' && (
            <div className="settings-section">
              <label>Theme</label>
              <div className="toggle-group">
                <button
                  className={config.theme === 'light' ? 'active' : ''}
                  onClick={() => updateConfig('theme', 'light')}
                  type="button"
                >
                  Light
                </button>
                <button
                  className={config.theme === 'dark' ? 'active' : ''}
                  onClick={() => updateConfig('theme', 'dark')}
                  type="button"
                >
                  Dark
                </button>
              </div>

              <label>Font</label>
              <select value={config.font} onChange={(e) => updateConfig('font', e.target.value)}>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
              </select>

              <label>Font Size</label>
              <input
                type="number"
                min="10"
                max="24"
                value={config.fontSize}
                onChange={(e) => updateConfig('fontSize', Number(e.target.value))}
              />
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="settings-section">
              <label>Widget Size</label>
              <select value={config.widgetSize} onChange={(e) => updateConfig('widgetSize', e.target.value)}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>

              <label>Position</label>
              <select value={config.position} onChange={(e) => updateConfig('position', e.target.value)}>
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
              </select>

              <label>Initial State</label>
              <select value={config.initialState} onChange={(e) => updateConfig('initialState', e.target.value)}>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>

              <label>Icon Shape</label>
              <select value={config.iconShape} onChange={(e) => updateConfig('iconShape', e.target.value)}>
                <option value="circle">Circle</option>
                <option value="rounded">Rounded Square</option>
                <option value="square">Square</option>
              </select>

              <label>Animation</label>
              <select value={config.animation} onChange={(e) => updateConfig('animation', e.target.value)}>
                <option value="fade">Fade</option>
                <option value="slide">Slide Up</option>
                <option value="bounce">Bounce</option>
              </select>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="settings-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.attachmentsEnabled}
                  onChange={(e) => updateConfig('attachmentsEnabled', e.target.checked)}
                />
                Enable Attachments
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.emojiEnabled}
                  onChange={(e) => updateConfig('emojiEnabled', e.target.checked)}
                />
                Enable Emoji
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.voiceEnabled}
                  onChange={(e) => updateConfig('voiceEnabled', e.target.checked)}
                />
                Enable Voice Input
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="designer-preview">
        <h3>Live Preview</h3>
        <div className="preview-box">
          <ChatWidget />
        </div>
      </div>
    </div>
  )
}

export default DesignerPage