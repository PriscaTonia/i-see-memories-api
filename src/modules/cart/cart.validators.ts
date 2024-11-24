import * as Yup from "yup";
import { OrderStatusEnum } from "./cart.types";

export const addOrderValidationSchema = Yup.object({
  frontCoverUrl: Yup.string()
    .url("Front cover must be a valid URL")
    .required("Front cover URL is required"),
  fullCoverUrl: Yup.string()
    .url("Full cover must be a valid URL")
    .required("Full cover URL is required"),
  quantity: Yup.number().required("Quantity is required"),
  price: Yup.number(),
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
  userId: Yup.string().matches(/^[a-f\d]{24}$/i, "Invalid user ID "),
  productId: Yup.string()
    .matches(/^[a-f\d]{24}$/i, "Invalid Product ID ")
    .required("Product ID is required"),
});

export const updateOrderQuantityValidationSchema = Yup.object({
  quantity: Yup.number(),
});

export const updateOrderShippingValidationSchema = Yup.object({
  ids: Yup.array(
    Yup.string()
      .matches(/^[a-f\d]{24}$/i, "Invalid order ID") // Validates MongoDB ObjectId
      .required("Order ID is required")
  ),

  // .required("IDs are required"),
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
  userId: Yup.string().matches(/^[a-f\d]{24}$/i, "Invalid user ID"),
  productId: Yup.string().matches(/^[a-f\d]{24}$/i, "Invalid user ID"),
});
