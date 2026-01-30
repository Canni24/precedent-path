
import { GoogleGenerativeAI, GenerationConfig } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function analyzeDocument(fileData: string, mimeType: string, prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent([
    {
      inlineData: {
        data: fileData,
        mimeType: mimeType,
      },
    },
    { text: prompt },
  ]);

  const response = await result.response;
  return response.text();
}

export async function chatWithAI(history: { role: string; parts: { text: string }[] }[], nextMessage: string, systemInstruction: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: systemInstruction
  });

  const chat = model.startChat({
    history: history,
  });

  const result = await chat.sendMessage(nextMessage);
  const response = await result.response;
  return response.text();
}
