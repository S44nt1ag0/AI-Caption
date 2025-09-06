import { Request, Response } from "express";
import CaptionRepository from "../../Repository/CaptionRepository";
import { CaptionDTO } from "../../DTO/CaptionDTO";

class CaptionHistory {
  private captionRepository: CaptionRepository;

  constructor() {
    this.captionRepository = new CaptionRepository();
  }

  history = async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated." });
    }

    try {
      const captions = await this.captionRepository.findAll(userId);

      if (!captions?.length) {
        return res
          .status(200)
          .send({ error: false, message: "No captions in your history." });
      }

      return res.status(200).send(CaptionDTO.basicDataList(captions));
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error." });
    }
  };
}

export default new CaptionHistory();
