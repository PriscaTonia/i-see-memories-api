import { Schema } from "mongoose";

export interface IOrderBase {
  frontCoverUrl: string;
  fullCoverUrl: string;
  status: OrderStatusEnum;
  shippingDetails: {
    name: string;
    country: string;
    state: string;
    street: string;
    city: string;
    zipcode: string;
  };
}

export interface IOrderReq extends IOrderBase {
  // productId: string;
}

// Use Omit but enforce required fields
export interface IOrder extends IOrderBase {
  productId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
}

export enum OrderStatusEnum {
  Cart = "Cart",
  Paid = "Paid",
  Processing = "Processing",
  Delivered = "Delivered",
}
