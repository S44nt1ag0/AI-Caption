import axios, { AxiosInstance } from "axios";
import { refineCaptions } from "../Helpers/utils";
import UserRepository from "../Repository/UserRepository";

import "dotenv/config";

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
      const lengthSeconds: number = data?.videoDetails?.lengthSeconds || null;

      if (lengthSeconds > 600) {
        const isPremium = await this.userRepository.isPremiumUser(id_user);
        if (!isPremium) {
          return {
            error: true,
            message: "Videos longer than 10 minutes are premium only.",
          };
        }
      }

      const tracklist = data?.captions?.playerCaptionsTracklistRenderer;

      if (!tracklist?.captionTracks?.length) {
        return { error: true, message: "Erro to find Caption." };
      }

      const track =
        tracklist.captionTracks.find((t) => t.languageCode === "pt") ||
        tracklist.captionTracks[0];

      const { data: caption } = await axios.get(track.baseUrl);
      const cleanText = refineCaptions(caption);

      return { title, body: cleanText };
    } catch (error) {
      return { error: true, message: "Erro to find Caption." };
    }
  }
}

export default new CaptionService();
