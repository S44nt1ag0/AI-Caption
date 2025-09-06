import { Request, Response } from "express";
import CaptionService from "../../Services/CaptionService";

class CaptionExtract {
  index = async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated." });
    }

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const result = await CaptionService.extract(url);
    return res.json(result);
  };
}

export default new CaptionExtract();
