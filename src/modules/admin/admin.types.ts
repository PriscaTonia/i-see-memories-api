import { Schema } from "mongoose";

export interface IAdminReq {
  email: string;
  password: string;
}

export interface IAdmin extends IAdminReq {
  _id: Schema.Types.ObjectId;
}
