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

    try {
      const Summary: IGemini = await GeminiApi(body);

      if (Summary.error) {
        throw Error(Summary.error);
      }

      return {
        body: Summary.text,
      };
      
    } catch {
      return {
        error: true,
        message: "Internal server error.",
      };
    }
  }
}

export const geminiService = new GeminiService();
