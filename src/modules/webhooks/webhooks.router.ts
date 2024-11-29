import express, { Request, Response, Router } from "express";
import { getPaystackWebhook } from "../../lib/payments";
import response from "../../utils/response";
import ordersService from "../orders/orders.service";

const webhooksRouter = Router();

// create a product
webhooksRouter.post("/webhooks/paystack", (req: Request, res: Response) => {
  const payload = getPaystackWebhook(req);

  if (payload.event !== "charge.success") return res.send(response("nah"));

  const orderId = payload.data.metadata.orderId;
  const order = ordersService.getOrdersById(orderId);

  console.log({
    event: payload.event,
    paystack: payload.data,
    metadata: payload.data.metadata,
  });

  console.log({ order });

  res.send(response("transaction complete"));
});

export default webhooksRouter;
