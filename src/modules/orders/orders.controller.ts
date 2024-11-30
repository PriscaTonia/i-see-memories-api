import express, { Request, Response } from "express";
import response from "../../utils/response";
import ordersService from "./orders.service";
import picturesService from "../pictures/pictures.service";
import { Schema } from "mongoose";
import { OrderStatusEnum } from "./orders.types";

// get orders controller
export const getAllOrders = async (
  req: express.Request,
  res: express.Response
) => {
  const orders = await ordersService.getOrders();

  res.send(response("Orders", orders));
};

// get an order controller
const findPicturesByFilters = async (
  orderId: Schema.Types.ObjectId,
  itemId: Schema.Types.ObjectId
) => {
  const picturesList = await picturesService.findPicturesByFilter(
    orderId,
    itemId
  );

  return picturesList;
};

export const getAnOrder = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const order = await ordersService.getOrdersById(id);

  // Fetch pictures for all items concurrently
  const itemsWithPictures = await Promise.all(
    order.items.map(async (item) => ({
      ...item,
      pictures: await findPicturesByFilters(order._id as any, item._id as any),
    }))
  );

  order.items = itemsWithPictures;

  res.send(response("Single Order Info", order));
};

// update an order
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateBody = req.body;

  const order = await ordersService.getOrdersById(id);

  const itemsWithPictures = await Promise.all(
    order.items.map(async (item) => ({
      ...item,
      pictures: await findPicturesByFilters(order._id as any, item._id as any),
    }))
  );

  order.items = itemsWithPictures;

  // if status is delivered,
  if (updateBody.status === OrderStatusEnum.Delivered) {
    const pictureIds = order.items.flatMap((x) =>
      x.pictures.map((x: any) => x.public_id)
    );

    await Promise.all(
      pictureIds.map(async (x) => {
        await picturesService.deletePictureFromCloud(x);
      })
    );

    picturesService.deleteManyFromDB(pictureIds);
  }

  const updatedOrder = await ordersService.updateOrderById(id, updateBody);

  res.send(response("Order updated successfully", updatedOrder));
};
