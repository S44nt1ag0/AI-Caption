import { Request, Response } from "express";
import CaptionRepository from "../../Repository/CaptionRepository";
import { CaptionFindDTO } from "../../DTO/CaptionFindDTO";

class CaptionList {
  private captionRepository: CaptionRepository;

  constructor() {
    this.captionRepository = new CaptionRepository();
  }

  list = async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated." });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    try {
      const findCaption = await this.captionRepository.findCaptionById(id);

      if (!findCaption) {
        return res
          .status(200)
          .json({ error: false, message: "Caption not found." });
      }

      if (findCaption.user_id !== userId) {
        return res
          .status(400)
          .json({ error: "Caption does not belong to this user." });
      }

      res.status(200).json({ ...CaptionFindDTO.basicData(findCaption) });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error." });
    }
  };
}

export default new CaptionList();
