const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Multer setup
const upload = multer({ dest: "uploads/" });

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const imageBuffer = fs.readFileSync(filePath);
    const base64Image = imageBuffer.toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 🌾 Perfect Agriculture Prompt
    const prompt = `
You are an agriculture expert.

Analyze the attached crop image carefully.
Return the response in the following exact format:

Disease Details:
(Explain the disease name, symptoms, reasons, and effect on the crop.)

Suggested Pesticides (Favare):
(List pesticide or spray names which can be used to cure this disease.)

Give the output first in English. Later translate the entire response into Marathi.
    `;

    const analysisResult = await model.generateContent([
      { inlineData: { mimeType: "image/jpeg", data: base64Image } },
      { text: prompt },
    ]);

    const englishResponse = analysisResult.response.text();

    // Now translate full English result to Marathi
    const translationPrompt = `Translate the following agriculture report into Marathi language:\n\n${englishResponse}`;

    const translationResult = await model.generateContent(translationPrompt);
    const marathiResponse = translationResult.response.text();

    // Cleanup uploaded file
    fs.unlinkSync(filePath);

    res.json({ english: englishResponse, marathi: marathiResponse });

  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to analyze image" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
