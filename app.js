const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString("base64");

    // Using gemini-1.5-flash instead of the deprecated gemini-pro-vision
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
      "Analyze this crop image and describe if there are any signs of disease.",
    ]);

    const englishText = result.response.text();

    const translateModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const translated = await translateModel.generateContent(
      `Translate the following to Marathi:\n\n${englishText}`
    );

    const marathiText = translated.response.text();

    res.json({ english: englishText, marathi: marathiText });
  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to analyze image" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
