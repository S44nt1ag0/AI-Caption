import axios, { AxiosInstance } from "axios";
import { getBase64Protobuf, transcriptToPlainText } from "../Helpers/utils";
import { ITranscript } from "../Interfaces/ITranscript";
import { HttpsProxyAgent } from "https-proxy-agent";
import { proxyConfig } from "../Helpers/utils";

class TranscriptService {
  async client(): Promise<AxiosInstance> {
    const proxy = proxyConfig();

    const httpsAgent = new HttpsProxyAgent(proxy);

    return axios.create({
      baseURL: "https://www.youtube.com",
      timeout: 10000,
      httpsAgent,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async transcript(videoId: string, language: string): Promise<ITranscript> {
    const message1 = {
      param1: "asr",
      param2: language,
    };

    const protobufMessage1 = getBase64Protobuf(message1);

    const message2 = {
      param1: videoId,
      param2: protobufMessage1,
    };

    const params = getBase64Protobuf(message2);

    try {
      const data = {
        context: {
          client: {
            clientName: "WEB",
            clientVersion: "2.20240826.01.00",
          },
        },
        params,
      };

      const client = await this.client();

      const response = await client.post("/youtubei/v1/get_transcript", data);

      const segments =
        response.data.actions?.[0]?.updateEngagementPanelAction?.content
          ?.transcriptRenderer?.content?.transcriptSearchPanelRenderer?.body
          ?.transcriptSegmentListRenderer?.initialSegments || [];

      const plainText: string = transcriptToPlainText(segments);

      return {
        text: plainText,
      };
    } catch {
      return {
        text: null,
      };
    }
  }
}

export const transcriptService = new TranscriptService();
