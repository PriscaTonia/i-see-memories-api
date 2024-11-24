import { Schema } from "mongoose";

export interface IPicture {
  _id?: string;
  url: string;
  size: number;
  type: string;
  public_id: string;
  filename: string;
  // duration?: any;
  pageNo: number;
  order: Schema.Types.ObjectId;
}
