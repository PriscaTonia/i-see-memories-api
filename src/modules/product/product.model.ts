import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product.types";

const ProductSchema = new mongoose.Schema<IProduct>({
  pageCount: { type: String },
  price: { type: Number },
  isDeleted: { type: Boolean, default: false },
});

export const ProductModel = mongoose.model("Product", ProductSchema);
