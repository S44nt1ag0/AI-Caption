import { Request, Response } from "express";
import UserRepository from "../../Repository/UserRepository";
import hashPassword from "../../Helpers/utils";

class CreateUser {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    try {
      const emailExists = await this.userRepository.findByEmail(email);

      if (emailExists) {
        return res.status(400).json({ error: "Email already exists." });
      }

      req.body.password = await hashPassword(password);

      const newUser = await this.userRepository.create(req.body);

      if (!newUser) {
        return res.status(400).json({ error: "Error to create User." });
      }

      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error to create User." });
    }
  };
}

export default new CreateUser();
