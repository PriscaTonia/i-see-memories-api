import mongoose, { Schema } from "mongoose";
import {
  IOrder,
  IOrderItem,
  OrderStatusEnum,
  PaymentStatusEnum,
} from "./orders.types";

const ItemSchema = new mongoose.Schema<IOrderItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  frontCoverUrl: { type: String },
  fullCoverUrl: { type: String },
  quantity: { type: Number },
});

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    items: [ItemSchema],
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
      enum: Object.values(PaymentStatusEnum),
      default: null,
    },
    paidOn: { type: Date, default: null },
    shippingDetails: {
      name: { type: String, default: "" },
      country: { type: String, default: "" },
      phoneNum: { type: String, default: "" },
      state: { type: String, default: "" },
      street: { type: String, default: "" },
      zipcode: { type: String, default: "" },
      city: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("order", OrderSchema);
