export interface ITemplateReq {
  frontCover: string;
  fullCover: string;
  name: string;
}

export interface ITemplate extends ITemplateReq {
  isDeleted: boolean;
}
