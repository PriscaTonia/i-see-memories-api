import mongoose, { Schema } from "mongoose";
import { IShipping } from "./shipping.types";

const ShippingSchema = new mongoose.Schema<IShipping>({
  label: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
});

export const ShippingModel = mongoose.model("shipping", ShippingSchema);
