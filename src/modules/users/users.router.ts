import express, { Request, Response, Router } from "express";
import { isAuthenticated } from "../../middlewares/index";
import {
  getUser,
  getAUserOrders,
  updateUser,
  getAUserCart,
  createPayment,
  addItemsToCart,
  updateShipping,
  getASingleOrder,
} from "./users.controller";
import validator from "../../middlewares/validator";
import { updateUserValidationSchema } from "./users.validators";
import {
  addToCartValidationSchema,
  updateOrderShippingValidationSchema,
} from "../orders/orders.validators";

const router = Router();

// update user controller
router.patch(
  "/users/profile",
  isAuthenticated,
  validator(updateUserValidationSchema),
  updateUser
);

// get a user's information controller
router.get("/users/profile/:id", isAuthenticated, getUser);

// get a user's order list controller
router.get("/users/orders", isAuthenticated, getAUserOrders);

// get a user's order controller
router.get("/users/orders/:id", isAuthenticated, getASingleOrder);

// get a user's cart list controller
router.get("/users/cart", isAuthenticated, getAUserCart);

// add to cart
router.post(
  "/users/cart",
  [isAuthenticated, validator(addToCartValidationSchema)],
  addItemsToCart
);

// update shipping for orders/cart
router.patch(
  "/users/order-shipping-details/:id",
  isAuthenticated,
  validator(updateOrderShippingValidationSchema),
  updateShipping
);

// initiate payment with paystack
router.post("/users/place-order", isAuthenticated, createPayment);

export default router;
