import mongoose, { Schema } from "mongoose";
import { IOrder, OrderStatusEnum } from "./orders.types";

const OrderSchema = new mongoose.Schema<IOrder>({
  // productId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "product",
  //   required: true,
  // },
  frontCoverUrl: { type: String },
  fullCoverUrl: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(OrderStatusEnum),
    default: OrderStatusEnum.Cart,
  },
  shippingDetails: {
    name: { type: String },
    country: { type: String },
    state: { type: String },
    street: { type: String },
    zipcode: { type: String },
    city: { type: String },
  },
});

export const OrderModel = mongoose.model("Order", OrderSchema);
