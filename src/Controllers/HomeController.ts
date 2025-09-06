import { Request, Response } from "express";

class HomeController {
  async index(req: Request, res: Response): Promise<Response> {
    return res.json({ version: "0.0.1", status: "working." });
  }
}

export default new HomeController();
