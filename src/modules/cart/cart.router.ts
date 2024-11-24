import express, { Router } from "express";
import { isAdminAuthenticated, isAuthenticated } from "../../middlewares/index";
import {
  createAnOrder,
  getAllOrders,
  getAnOrder,
  updateOrder,
} from "./cart.controller";
import validator from "../../middlewares/validator";
import {
  addOrderValidationSchema,
  updateOrderShippingValidationSchema,
  updateOrderValidationSchema,
} from "./cart.validators";

const orderRouter = Router();

// get all orders
orderRouter.get("/orders", isAdminAuthenticated, getAllOrders);

// get order by id
orderRouter.get("/orders/:id", isAdminAuthenticated, getAnOrder);

//create an order
orderRouter.post(
  "/orders",
  isAuthenticated,
  validator(addOrderValidationSchema),
  createAnOrder
);

// update an order for shipping details
// orderRouter.patch(
//   "/orders/shipping",
//   isAuthenticated,
//   validator(updateOrderShippingValidationSchema),
//   updateOrder
// );

// update an order
orderRouter.patch(
  "/orders/:id",
  isAdminAuthenticated,
  validator(updateOrderValidationSchema),
  updateOrder
);

export default orderRouter;
