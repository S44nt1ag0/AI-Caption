import { Request, Response } from "express";

class LoginController {
  async login(req: Request, res: Response): Promise<Response> {
    res.send("Login successful");
  }
}

export default new LoginController();
