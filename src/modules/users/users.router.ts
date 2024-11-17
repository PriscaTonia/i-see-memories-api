import express, { Request, Response, Router } from "express";
import { isAuthenticated } from "../../middlewares/index";
import {
  getUser,
  getAUserOrders,
  updateUser,
  getAUserCart,
} from "./users.controller";
import validator from "../../middlewares/validator";
import { updateUserValidationSchema } from "./users.validators";

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

export default router;
