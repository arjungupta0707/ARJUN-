import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client strictly using guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Love letters and poetry generator endpoint
app.post("/api/generate-letter", async (req, res) => {
  try {
    const { partnerName, yourName, qualities, style, language } = req.body;

    if (!partnerName || !yourName) {
      res.status(400).json({ error: "Partner name and Your name are required." });
      return;
    }

    const qualitiesStr = qualities && qualities.length > 0 ? qualities.join(", ") : "sweet and amazing";

    let prompt = "";
    if (style === "shayari") {
      prompt = `Write a beautiful, deeply touching, and soul-stirring Hindi/Urdu Love Shayari or Urdu ghazal couplets (written in Hindi text script or readable Roman Hindi/Urdu, with translated English explanation underneath if appropriate) for ${partnerName} from ${yourName}. 
      The partner ${partnerName} is known for these qualities: ${qualitiesStr}.
      Make it feel incredibly romantic, warm, emotional, and poetic (like real Urdu shayaris or Bollywood romance). 
      Do NOT write a generic intro like "Here is your Shayari:" — start writing the romantic lines directly. Use beautiful formatting with line breaks.`;
    } else if (style === "letter") {
      prompt = `Write a heart-touching, deeply emotional, and beautiful romantic love letter from ${yourName} to ${partnerName}. 
      Mention how much they mean to you, and specifically cherish their qualities: ${qualitiesStr}.
      Language: write in ${language || "English"}. If ${language} is Hindi, write using emotional Hindi words and a touching flow.
      Keep it sweet, warm, intimate, and absolutely real-feeling. Keep it elegant. 
      Do NOT include placeholders, bracketed text, or generic meta-commentary — start directly with "Mere pyaare ${partnerName}," or "To my dearest ${partnerName}," and conclude with a sweet sign-off from ${yourName}.`;
    } else {
      // funny note
      prompt = `Write an ultra-cute, playful, teasing, and funny love message or mini love report from ${yourName} to ${partnerName}.
      List some adorable complaints and sweet compliments matching their characteristics: ${qualitiesStr}.
      Language: ${language || "English / Roman Hindi"}. Combine gentle teasing with true affection. 
      Do NOT write generic introductions. Start directly with the message. Use cute bullet points or emojis where appropriate.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 1.0,
      }
    });

    res.json({ message: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "Could not write love letter. Make sure your GEMINI_API_KEY is configured in Secrets panel.",
      details: error.message 
    });
  }
});

// Setup Vite Dev Server / Static Asset Flow
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
