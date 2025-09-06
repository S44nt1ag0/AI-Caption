import ICaption from "../Entities/Caption";
import ICaptionRepository from "../Interfaces/ICaptionRepository";
import Caption from "../Database/Models/Captions";

export default class CaptionRepository implements ICaptionRepository {
  async create(caption: ICaption): Promise<ICaption> {
    const createdUser = await Caption.create(caption);
    return createdUser;
  }

  async findAll(userId: string): Promise<ICaption[]> {
    return await Caption.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]],
    });
  }
}
