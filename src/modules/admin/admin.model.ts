import { InternalServerError } from "../../config/errors";
import { NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IAdmin } from "./admin.types";

const AdminSchema = new mongoose.Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

AdminSchema.pre(["save"], async function (next: NextFunction) {
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

AdminSchema.pre(["updateOne"], async function (next: NextFunction) {
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

export const AdminModel = mongoose.model("Admin", AdminSchema);
