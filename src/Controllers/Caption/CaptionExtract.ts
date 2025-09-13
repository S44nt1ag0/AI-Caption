import { Request, Response } from "express";
import CaptionService from "../../Services/CaptionService";
import CaptionRepository from "../../Repository/CaptionRepository";
import ICaption from "../../Entities/Caption";
import { CaptionExtractDTO } from "../../DTO/CaptionExtractDTO";

class CaptionExtract {
  private captionRepository: CaptionRepository;

  constructor() {
    this.captionRepository = new CaptionRepository();
  }

  index = async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated." });
    }

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const result = await CaptionService.extract(url, userId);

    if ("error" in result && result.error) {
      if (result.message == "Videos longer than 10 minutes are premium only.") {
        return res.status(404).json(result);
      }

      try {
        const data: ICaption = {
          user_id: userId,
          url: url,
          success: false,
          body: null,
          title: result?.title,
          thumbnail: result?.thumbnail,
        };

        const insertCaption = await this.captionRepository.create(data);

        if (!insertCaption) {
          throw Error("Error to insert fail ocurrence to Caption.");
        }

        return res.status(404).json(result);
      } catch (error) {
        return res
          .status(500)
          .json({ error: true, message: "Internal server error." });
      }
    }

    try {
      const data: ICaption = {
        user_id: userId,
        url: url,
        success: true,
        body: result?.body,
        title: result?.title,
        thumbnail: result?.thumbnail,
      };

      const insertCaption = await this.captionRepository.create(data);

      if (!insertCaption) {
        throw Error("Error to insert Success ocurrence to Caption.");
      }

      return res.json({ ...CaptionExtractDTO.basicData(insertCaption) });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Internal server error." });
    }
  };
}

export default new CaptionExtract();
