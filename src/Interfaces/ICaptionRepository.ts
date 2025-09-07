import ICaption from "../Entities/Caption";

export default interface ICaptionRepository {
  create(caption: ICaption): Promise<ICaption>;
  findAll(id: string): Promise<ICaption[]>;
  findCaptionById(id: string): Promise<ICaption>;
}
