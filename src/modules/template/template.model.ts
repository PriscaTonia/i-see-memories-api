import mongoose, { Schema } from "mongoose";
import { ITemplate } from "./template.types";

const TemplateSchema = new mongoose.Schema<ITemplate>({
  frontCover: { type: String },
  fullCover: { type: String },
  name: { type: String },
  isDeleted: { type: Boolean, default: false },
});

export const TemplateModel = mongoose.model("Template", TemplateSchema);
