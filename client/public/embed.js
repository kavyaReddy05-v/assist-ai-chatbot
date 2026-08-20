(function () {
  var config = window.AssistAIConfig || {};
  var position = config.position || 'bottom-right';

  var iframe = document.createElement('iframe');
  iframe.src = 'https://assist-ai-chatbot.vercel.app/';
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.zIndex = '999999';
  iframe.style.background = 'white';
  iframe.allow = 'microphone';
  iframe.title = 'Assist AI App';

  document.body.appendChild(iframe);
})();