export default interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  premium?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
