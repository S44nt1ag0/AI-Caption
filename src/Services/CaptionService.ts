import axios, { AxiosInstance } from "axios";
import { refineCaptions } from "../Helpers/utils";
import "dotenv/config";

class CaptionService {
  client(): AxiosInstance {
    return axios.create({
      baseURL: "https://www.youtube.com",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async extract(url: string) {
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

      const tracklist = data?.captions?.playerCaptionsTracklistRenderer;

      if (!tracklist?.captionTracks?.length) {
        return;
      }

      const track =
        tracklist.captionTracks.find((t) => t.languageCode === "pt") ||
        tracklist.captionTracks[0];

      const { data: caption } = await axios.get(track.baseUrl);
      const cleanText = refineCaptions(caption);

      return { body: cleanText };
    } catch (error) {
      console.error("Erro ao extrair legendas:", error);
      return null;
    }
  }
}

export default new CaptionService();
