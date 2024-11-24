import mongoose, { Schema } from "mongoose";
import { IOrder, OrderStatusEnum } from "./orders.types";

const OrderSchema = new mongoose.Schema<IOrder>({
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      frontCoverUrl: { type: String },
      fullCoverUrl: { type: String },
      quantity: { type: Number },
    },
  ],
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
  paymentStatus: {
    type: String,
    enum: Object.values(OrderStatusEnum),
    default: null,
  },
  shippingDetails: {
    name: { type: String, default: "" },
    country: { type: String, default: "" },
    phoneNum: { type: String, default: "" },
    state: { type: String, default: "" },
    street: { type: String, default: "" },
    zipcode: { type: String, default: "" },
    city: { type: String, default: "" },
  },
});

export const OrderModel = mongoose.model("order", OrderSchema);
