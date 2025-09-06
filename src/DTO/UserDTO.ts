import IUser from "../Entities/User";

export class UserDTO {
  static toResponse(user: IUser) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
