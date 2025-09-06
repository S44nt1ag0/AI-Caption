import IUser from "../Entities/User";
import IUserRepository from "../Interfaces/IUserRepository";
import User from "../Database/Models/UserModel";

export default class UserRepository implements IUserRepository {
  async findPasswordByEmail(email: string): Promise<string> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    return user.password;
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await User.findByPk(id);
    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const emailExists = await User.findOne({ where: { email } });
    return emailExists;
  }

  async create(user: IUser): Promise<IUser> {
    const createdUser = await User.create(user);
    return createdUser;
  }
}
