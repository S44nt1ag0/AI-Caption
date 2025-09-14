import axios from "axios";
import { ISummary } from "../Interfaces/ISummary";
import { GeminiApi } from "./GeminiService";
import { IGemini } from "../Interfaces/IGemini";

class GeminiService {
  async getSummary(body: string): Promise<ISummary> {
    if (!body || body.length < 10) {
      return {
        error: true,
        message: "Invalid body.",
      };
    }

    const Summary: IGemini = await GeminiApi(body);

    return {
      body: Summary.text,
    };
  }
}

export const geminiService = new GeminiService();
