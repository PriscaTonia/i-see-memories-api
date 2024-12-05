import { Schema } from "mongoose";
// import { IProduct } from "../product/product.types";

interface IOrderItemBase {
  frontCoverUrl: string;
  fullCoverUrl: string;
  quantity: number;
  title: string;
  subTitle: string;
  color: string;
}

export interface IOrderItem {
  _id: Schema.Types.ObjectId;
  frontCoverUrl: string;
  fullCoverUrl: string;
  quantity: number;
  productId: Schema.Types.ObjectId;
  pictures?: any;
  title: string;
  subTitle: string;
  color: string;
}

export interface IOrderReqItem {
  frontCoverUrl: string;
  fullCoverUrl: string;
  quantity: number;
  productId: string;
  title: string;
  subTitle: string;
  color: string;
}

export interface IOrderBase {
  items: IOrderItemBase[]; // Corrected to an array
  orderNo: string;
  status: OrderStatusEnum;
  paymentStatus: PaymentStatusEnum;
  shippingType: ShippingTypeEnum;
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
  items: IOrderReqItem[];
}

export interface IOrder extends IOrderBase {
  items: IOrderItem[];
  userId: Schema.Types.ObjectId;
  paidOn: Date;
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

export enum ShippingTypeEnum {
  island = "island",
  mainland = "mainland",
  home = "home",
  pickup = "pickup",
}
