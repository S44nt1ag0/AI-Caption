import { GoogleGenAI } from "@google/genai";
import { IGemini } from "../Interfaces/IGemini";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function GeminiApi(body: string): Promise<IGemini> {
  try {
    const prompt = `
Resuma o seguinte conteúdo em português, de forma clara e direta.
Não explique nada além do resumo. 
Não repita instruções, apenas traga o resumo puro:

"${body}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    return { text: response?.text };
  } catch {
    return { text: null };
  }
}
