export default interface ICaption {
  id: string;
  user_id: string;
  url: string;
  success?: boolean;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
