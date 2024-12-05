import { ShippingTypeEnum } from "../orders/orders.types";

export const SHIPPING_CONFIG = [
  {
    label: "Island Delivery (Inside Lagos)",
    type: ShippingTypeEnum.island,
    price: 3000,
  },
  {
    label: "Mainland Delivery (Inside Lagos)",
    type: ShippingTypeEnum.mainland,
    price: 4500,
  },
  {
    label: "Home Delivery (Outside Lagos)",
    type: ShippingTypeEnum.home,
    price: 15000,
  },
  {
    label: "Pickup Delivery (Outside Lagos)",
    type: ShippingTypeEnum.pickup,
    price: 6000,
  },
];
