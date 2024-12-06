import * as Yup from "yup";
import { OrderStatusEnum } from "./orders.types";

export const addToCartValidationSchema = Yup.array(
  Yup.object({
    frontCoverUrl: Yup.string()
      .url("Front cover must be a valid URL")
      .required("Front cover URL is required"),
    fullCoverUrl: Yup.string()
      .url("Full cover must be a valid URL")
      .required("Full cover URL is required"),
    quantity: Yup.number().required("Quantity is required"),
    title: Yup.string(),
    subTitle: Yup.string(),
    color: Yup.string(),
    productId: Yup.string()
      .matches(/^[a-f\d]{24}$/i, "Invalid Product ID ")
      .required("Product ID is required"),
  })
);

// for user
export const updateOrderShippingValidationSchema = Yup.object({
  name: Yup.string(),
  country: Yup.string(),
  state: Yup.string(),
  street: Yup.string(),
  city: Yup.string(),
  phoneNum: Yup.string(),
  zipcode: Yup.string().matches(/^\d+$/, "Zipcode must be numeric"),
});

// for admin
export const updateOrderValidationSchema = Yup.object({
  status: Yup.mixed<OrderStatusEnum>().oneOf(
    Object.values(OrderStatusEnum),
    `Status must be one of: ${Object.values(OrderStatusEnum).join(", ")}`
  ),
  shippingDetails: Yup.object({
    name: Yup.string(),
    country: Yup.string(),
    state: Yup.string(),
    street: Yup.string(),
    city: Yup.string(),
    phoneNum: Yup.string(),
    zipcode: Yup.string().matches(/^\d+$/, "Zipcode must be numeric"),
  }),
});
