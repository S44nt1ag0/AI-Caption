import ICaption from "../Entities/Caption";

export class CaptionDTO {
  static basicData(caption: ICaption) {
    return {
      id: caption.id,
      createdAt: caption.createdAt,
      title: caption.title,
    };
  }

  static basicDataList(captions: ICaption[] | ICaption) {
    if (Array.isArray(captions)) {
      return captions.map(CaptionDTO.basicData);
    }
    return CaptionDTO.basicData(captions);
  }
}
