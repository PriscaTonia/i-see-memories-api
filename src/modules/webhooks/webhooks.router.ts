import express, { Request, Response, Router } from "express";
import { getPaystackWebhook } from "../../lib/payments";
import response from "../../utils/response";
import ordersService from "../orders/orders.service";
import { OrderStatusEnum, PaymentStatusEnum } from "../orders/orders.types";

const webhooksRouter = Router();

// create a product
webhooksRouter.post(
  "/webhooks/paystack",
  async (req: Request, res: Response) => {
    const payload = getPaystackWebhook(req);
    const data = payload.data;

    if (payload.event !== "charge.success") return res.send(response("nah"));

    if (data.requested_amount !== data.amount) return res.send(response("nah"));

    const orderId = payload.data.metadata.orderId;
    const order = await ordersService.getOrdersById(orderId);

    // update order
    await ordersService.updateOrderById(orderId, {
      status: OrderStatusEnum.Paid,
      paymentStatus: PaymentStatusEnum.Successful,
      paidOn: data.paidAt,
    });

    console.log({
      event: payload.event,
      paystack: payload.data,
      metadata: payload.data.metadata,
    });

    console.log({ order });

    res.send(response("transaction complete"));
  }
);

export default webhooksRouter;
