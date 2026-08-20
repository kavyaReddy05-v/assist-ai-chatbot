# Assist AI

A customizable chatbot widget built the assignment. You can configure how the bot looks and behaves from a designer panel, and it actually connects to Gemini for real conversations — not a mock response.

**Live app:** https://assist-ai-chatbot.vercel.app
**Backend:** https://assist-ai-chatbot-production.up.railway.app

## What it does

Open the app and you'll see a settings panel on the left and a live preview of the chat widget on the right. Change the theme, font, widget size, position, animation, whatever — the preview updates instantly.

The chat itself is a normal conversation with Gemini. You can also:
- Upload an image or PDF and ask questions about it
- Use your mic to talk instead of typing
- Add emojis
- Get properly formatted replies (bold text, bullet points, etc. instead of raw markdown symbols)

Settings and your chat history stick around even if you refresh the page.

## How it's built

- React (Vite) on the frontend
- Node + Express on the backend
- Gemini API for the actual chatbot brain
- Frontend is hosted on Vercel, backend on Railway

## Running it yourself

Clone it, then set up the backend: