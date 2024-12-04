import { Request, Response } from "express";
import response from "../../utils/response";
import shippingService from "./shipping.service";
import { IAdmin } from "../admin/admin.types";

// get shipping prices
export const getAllShippingPrices = async (req: Request, res: Response) => {
  const shippingPrice = await shippingService.getShippingPrices();

  res.send(response("Shipping prices", shippingPrice));
};

// create shipping price
export const updateShippingPrice = async (
  req: Request & { admin: IAdmin },
  res: Response
) => {
  const id = req.admin._id;
  const body = req.body;

  for (let i = 0; i < body.length; i++) {
    await shippingService.createOrUpdateService(body[i]);
  }

  res.send(response("Shipping price created successfully", body));
};
