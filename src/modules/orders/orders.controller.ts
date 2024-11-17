import express, { Request, Response } from "express";
import response from "../../utils/response";
import ordersService from "./orders.service";
import { IUser } from "../users/users.types";

// get orders controller
export const getAllOrders = async (
  req: express.Request,
  res: express.Response
) => {
  const orders = await ordersService.getOrders();

  res.send(response("Orders", orders));
};

// get an order controller
export const getAnOrder = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const order = await ordersService.getOrdersById(id);

  res.send(response("Single Order Info", order));
};

// create an order
export const createAnOrder = async (
  req: Request & { user: IUser },
  res: Response
) => {
  const id = req.user._id;
  const order = await ordersService.createOrderByUserId({
    ...req.body,
    userId: id,
  });
  res.send(response("Order created successfully", order));
};

// update an order
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateBody = req.body;

  const updatedOrder = await ordersService.updateOrderById(id, updateBody);

  if (!updatedOrder) {
    return res.status(404).send(response("Order not found", null, false));
  }

  res.send(response("Order updated successfully", updatedOrder));
};
