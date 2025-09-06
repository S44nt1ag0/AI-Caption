import IUser from "../Entities/User";

export default interface IUserRepository {
  findPasswordByEmail(email: string): Promise<string>;
  create(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}
