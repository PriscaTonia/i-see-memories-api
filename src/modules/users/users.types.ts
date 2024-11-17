import { Schema } from "mongoose";

export interface IUserReq {
  email: string;
  password: string;
}

export interface IUser extends IUserReq {
  _id: Schema.Types.ObjectId;
  isDeleted: boolean;
  name?: string;
  country?: string;
  state?: string;
  street?: string;
  city?: string;
  zipcode?: string;
}
