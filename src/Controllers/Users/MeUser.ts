import UserRepository from "../../Repository/UserRepository";
import { UserDTO } from "../../DTO/UserDTO";

class MeUser {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  meUser = async (req, res) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated." });
    }

    try {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      return res.status(200).json({ user: UserDTO.toResponse(user) });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error to fetch user data." });
    }
  };
}

export default new MeUser();
