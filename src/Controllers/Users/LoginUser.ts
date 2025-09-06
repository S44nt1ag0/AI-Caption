import { Request, Response } from "express";
import UserRepository from "../../Repository/UserRepository";
import { comparePassword } from "../../Helpers/utils";
const jwt = require("jsonwebtoken");

class LoginUser {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        return res.status(400).json({ error: "Invalid email or password." });
      }

      const storedPassword = await this.userRepository.findPasswordByEmail(
        email
      );
      const isPasswordValid = await comparePassword(password, storedPassword);

      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password." });
      }

      const token = jwt.sign(
        { id: user?.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );

      return res.status(200).json({ access_token: token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error to login User." });
    }
  };
}

export default new LoginUser();
