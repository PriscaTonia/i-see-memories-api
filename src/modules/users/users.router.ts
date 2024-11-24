import express, { Request, Response, Router } from "express";
import { isAuthenticated } from "../../middlewares/index";
import {
  getUser,
  getAUserOrders,
  updateUser,
  getAUserCart,
  updateAUserCartItem,
  deleteACartItem,
  updateCartShipping,
} from "./users.controller";
import validator from "../../middlewares/validator";
import { updateUserValidationSchema } from "./users.validators";
import {
  updateOrderQuantityValidationSchema,
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

// get a user's cart list controller
router.get("/users/cart", isAuthenticated, getAUserCart);

// delete a cart item
router.delete("/users/cart/:id", isAuthenticated, deleteACartItem);

// update quantity cart
router.patch(
  "/users/cart/:id",
  isAuthenticated,
  validator(updateOrderQuantityValidationSchema),
  updateAUserCartItem
);

// update shipping for cart
router.patch(
  "/users/cart/shipping",
  isAuthenticated,
  validator(updateOrderShippingValidationSchema),
  updateCartShipping
);

export default router;
