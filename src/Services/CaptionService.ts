import axios, { AxiosInstance } from "axios";
import UserRepository from "../Repository/UserRepository";
import { geminiService } from "./SummaryService";
import { ISummary } from "../Interfaces/ISummary";
import { transcriptService } from "./TranscriptService";
import { ITranscript } from "../Interfaces/ITranscript";

class CaptionService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  client(): AxiosInstance {
    return axios.create({
      baseURL: "https://www.youtube.com",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async extract(url: string, id_user: string) {
    const videoId = url?.split("v=")?.[1] || null;

    if (!videoId) return null;

    try {
      const { data } = await this.client().post(
        `/youtubei/v1/player?key=${process.env.INNERTUBE_API_KEY}`,
        {
          context: {
            client: {
              clientName: "ANDROID",
              clientVersion: "20.10.38",
            },
          },
          videoId: videoId,
        }
      );

      if (!data) {
        return { error: true, message: "Erro to find Caption." };
      }

      const title: string = data?.videoDetails?.title || null;
      const thumbnail = data.videoDetails.thumbnail.thumbnails[3].url;
      const lengthSeconds: number = data?.videoDetails?.lengthSeconds || null;
      const lang: string =
        data?.captions.playerCaptionsTracklistRenderer.captionTracks[0]
          .languageCode || "pt";

      if (lengthSeconds > 600) {
        const isPremium = await this.userRepository.isPremiumUser(id_user);
        if (!isPremium) {
          return {
            error: true,
            message: "Videos longer than 10 minutes are premium only.",
          };
        }
      }

      const transcript: ITranscript = await transcriptService.transcript(
        videoId,
        lang
      );

      if (!transcript.text) {
        throw Error("Erro to find Caption.");
      }

      const summarize: ISummary = await geminiService.getSummary(
        transcript.text
      );

      return { title, thumbnail, body: summarize?.body || transcript?.text };
    } catch (error) {
      return { error: true, message: "Erro to find Caption." };
    }
  }
}

export default new CaptionService();
