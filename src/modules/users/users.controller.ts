import express, { Request, Response } from "express";
import userService from "./users.service";
import response from "../../utils/response";
import { omit } from "lodash";
import usersService from "./users.service";
import { IUser } from "./users.types";
import ordersService from "../orders/orders.service";
import productService from "../product/product.service";
import mongoose from "mongoose";

// CART

// get a user's cart controller
export const getAUserCart = async (
  req: express.Request & { user: IUser },
  res: express.Response
) => {
  const id = req.user._id;
  const cart = await ordersService.getCartByUserId(id);

  res.send(response("Cart List", cart));
};

// update a user's cart for quantity controller
export const updateAUserCartItem = async (
  req: express.Request & { user: IUser },
  res: express.Response
) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const order = await ordersService.getOrdersById(id);
  const product = await productService.getAProductById(
    order.productId.toString()
  );

  let modifiedBody = {
    quantity: quantity,
    price: product.price * quantity,
  };

  const cart = await ordersService.updateOrderById(id, modifiedBody);

  res.send(response("Cart Item Updated", cart));
};

// update a user's cart for shipping controller
export const updateCartShipping = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateBody = req.body;

  updateBody.ids = updateBody.ids.map(
    (x: string) => new mongoose.Types.ObjectId(x)
  );

  const updatedOrder = await ordersService.updateShippingDetailsForOrders(
    updateBody.ids,
    updateBody.shippingDetails
  );

  if (!updatedOrder) {
    return res.status(404).send(response("Order not found", null, false));
  }

  res.send(response("Cart updated successfully", updatedOrder));
};

// delete a cart item
export const deleteACartItem = async (
  req: express.Request & { user: IUser },
  res: express.Response
) => {
  const { id } = req.params;
  const cartItem = await ordersService.deleteOrderById(id);

  res.send(response("Cart Item Deleted", cartItem));
};

// ORDERS

// get a user's orders controller
export const getAUserOrders = async (
  req: express.Request & { user: IUser },
  res: express.Response
) => {
  const id = req.user._id;
  const orders = await ordersService.getOrdersByUserId(id);

  res.send(response("Orders List", orders));
};

// USER

// get user controller
export const getUser = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const user = await userService.getUsersById(id);

  // @ts-ignore
  const filteredUser = omit(user._doc, ["password", "__v"]);

  res.send(response("User Info", filteredUser));
};

// delete a user controller
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  const deletedUser = await userService.deleteUserById(id);

  return res.status(200).send({
    success: true,
    message: "User Deleted Successfully",
    data: deletedUser,
  });
};

// update a user
export const updateUser = async (
  req: Request & { user: IUser },
  res: Response
) => {
  const id = req.user._id;
  const updateBody = req.body;

  const updatedUser = await usersService.updateUserById(id, updateBody);

  if (!updatedUser) {
    return res.status(404).send(response("User not found", null, false));
  }

  // @ts-ignore
  const filteredUser = omit(updatedUser._doc, ["password", "__v"]);

  res.send(response("User updated successfully", filteredUser));
};
