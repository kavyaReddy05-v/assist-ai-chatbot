(function () {
  var config = window.AssistAIConfig || {};
  var position = config.position || 'bottom-right';

  var iframe = document.createElement('iframe');
  iframe.src = 'https://assist-ai-chatbot.vercel.app/widget';
  iframe.style.position = 'fixed';
  iframe.style.bottom = '0';
  iframe.style[position === 'bottom-left' ? 'left' : 'right'] = '0';
  iframe.style.width = '400px';
  iframe.style.height = '650px';
  iframe.style.border = 'none';
  iframe.style.zIndex = '999999';
  iframe.style.background = 'transparent';
  iframe.allow = 'microphone';
  iframe.title = 'Assist AI Chat Widget';

  document.body.appendChild(iframe);
})();