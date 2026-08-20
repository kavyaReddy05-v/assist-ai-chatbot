import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/api/ping", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, image, history } = req.body;

    if (!message && !image) {
      return res.status(400).json({ error: "Message or image is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

    const contents = (history || []).map((h) => ({
      role: h.sender === "user" ? "user" : "model",
      parts: [{ text: h.text || "" }]
    }));

    const currentParts = [];
    if (message) currentParts.push({ text: message });
    if (image) {
      currentParts.push({
        inlineData: {
          data: image.data,
          mimeType: image.mimeType
        }
      });
    }

    contents.push({ role: "user", parts: currentParts });

    const result = await model.generateContent({ contents });
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ error: "Something went wrong talking to the AI" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});