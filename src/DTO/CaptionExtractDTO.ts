import ICaption from "../Entities/Caption";

export class CaptionExtractDTO {
  static basicData(caption: ICaption) {
    return {
        id: caption.id,
        success: caption.success
    };
  }
}
