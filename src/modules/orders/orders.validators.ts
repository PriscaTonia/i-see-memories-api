import * as Yup from "yup";
import { OrderStatusEnum } from "./orders.types";

export const addOrderValidationSchema = Yup.object({
  frontCoverUrl: Yup.string()
    .url("Front cover must be a valid URL")
    .required("Front cover URL is required"),
  fullCoverUrl: Yup.string()
    .url("Full cover must be a valid URL")
    .required("Full cover URL is required"),
  status: Yup.mixed<OrderStatusEnum>()
    .oneOf(
      Object.values(OrderStatusEnum),
      `Status must be one of: ${Object.values(OrderStatusEnum).join(", ")}`
    )
    .required("Order status is required"),
  shippingDetails: Yup.object({
    name: Yup.string().required("Name is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    zipcode: Yup.string()
      .matches(/^\d+$/, "Zipcode must be numeric")
      .required("Zipcode is required"),
  }).required("Shipping details are required"),
  userId: Yup.string().matches(
    /^[a-f\d]{24}$/i,
    "User ID must be a valid MongoDB ObjectId"
  ),
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
    zipcode: Yup.string().matches(/^\d+$/, "Zipcode must be numeric"),
  }),
  userId: Yup.string().matches(
    /^[a-f\d]{24}$/i,
    "User ID must be a valid MongoDB ObjectId"
  ),
});
