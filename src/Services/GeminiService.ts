import { GoogleGenAI } from "@google/genai";
import { IGemini } from "../Interfaces/IGemini";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function GeminiApi(body: string): Promise<IGemini> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `summarize this ${body}`,
    });

    return { text: response?.text };
  } catch {
    return { text: null };
  }
}
