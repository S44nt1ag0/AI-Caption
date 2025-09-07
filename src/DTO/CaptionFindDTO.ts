import ICaption from "../Entities/Caption";

export class CaptionFindDTO {
  static basicData(caption: ICaption) {
    return {
      success: caption.success,
      url: caption.url,
      body: caption.body,
    };
  }
}
