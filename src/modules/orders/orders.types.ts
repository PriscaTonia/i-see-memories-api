import { Schema } from "mongoose";
// import { IProduct } from "../product/product.types";

interface IOrderItemBase {
  frontCoverUrl: string;
  fullCoverUrl: string;
  quantity: number;
}

interface IOrderItem {
  frontCoverUrl: string;
  fullCoverUrl: string;
  quantity: number;
  productId: Schema.Types.ObjectId;
}

export interface IOrderReqItem {
  frontCoverUrl: string;
  fullCoverUrl: string;
  quantity: number;
  productId: string;
}

export interface IOrderBase {
  items: IOrderItemBase[]; // Corrected to an array

  status: OrderStatusEnum;
  paymentStatus: PaymentStatusEnum;
  shippingDetails: {
    name: string;
    country: string;
    phoneNum: string;
    state: string;
    street: string;
    city: string;
    zipcode: string;
  };
}

export interface IOrderReq extends IOrderBase {
  items: IOrderReqItem[]; // Corrected to an array
}

export interface IOrder extends IOrderBase {
  items: IOrderItem[]; // Corrected to an array
  userId: Schema.Types.ObjectId;
}

export enum OrderStatusEnum {
  Cart = "Cart",
  Paid = "Paid",
  Processing = "Processing",
  Delivered = "Delivered",
}

export enum PaymentStatusEnum {
  Pending = "Pending",
  Successful = "Successful",
  Failed = "Failed",
}
