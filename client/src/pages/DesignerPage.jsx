import { useChatConfig } from '../context/ChatConfigContext'
import ChatWidget from '../components/ChatWidget'
import './DesignerPage.css'

function DesignerPage() {
  const { config, updateConfig } = useChatConfig()

  return (
    <div className="designer-layout">
      <div className="designer-panel">
        <h2>Chatbot Designer</h2>

        <label>Theme</label>
        <select value={config.theme} onChange={(e) => updateConfig('theme', e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <label>Primary Color</label>
        <input
          type="color"
          value={config.primaryColor}
          onChange={(e) => updateConfig('primaryColor', e.target.value)}
        />

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