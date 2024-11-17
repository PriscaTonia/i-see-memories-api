import express, { Request, Response } from "express";
import userService from "./users.service";
import response from "../../utils/response";
import { omit } from "lodash";
import usersService from "./users.service";
import { IUser } from "./users.types";
import ordersService from "../orders/orders.service";

// get a user's cart controller
export const getAUserCart = async (
  req: express.Request & { user: IUser },
  res: express.Response
) => {
  const id = req.user._id;
  const cart = await ordersService.getCartByUserId(id);

  res.send(response("User Cart List", cart));
};

// get a user's orders controller
export const getAUserOrders = async (
  req: express.Request & { user: IUser },
  res: express.Response
) => {
  const id = req.user._id;
  const orders = await ordersService.getOrdersByUserId(id);

  res.send(response("User Orders List", orders));
};

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
