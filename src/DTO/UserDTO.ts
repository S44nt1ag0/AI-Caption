import IUser from "../Entities/User";

export class UserDTO {
  static basicData(user: IUser) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      premium: user.premium,
    };
  }
}
