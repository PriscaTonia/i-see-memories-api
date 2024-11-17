import { InternalServerError } from "../../config/errors";
import { IUser } from "./users.types";
import { NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  name: { type: String },
  country: { type: String },
  state: { type: String },
  zipcode: { type: String },
  city: { type: String },
});

UserSchema.pre(["save"], async function (next: NextFunction) {
  try {
    if (!this.isNew || !this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password, salt);
    this.password = hashed;

    next();
  } catch (error) {
    throw new InternalServerError(error);
  }
});

UserSchema.pre(["updateOne"], async function (next: NextFunction) {
  // @ts-ignore
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    // @ts-ignore
    const hashed = await bcrypt.hash(this.password, salt);
    // @ts-ignore
    this.password = hashed;

    next();
  } catch (error) {
    throw new InternalServerError(error);
  }
});

export const UserModel = mongoose.model("User", UserSchema);
