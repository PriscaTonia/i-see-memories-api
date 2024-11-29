import express, { Request, Response, Router } from "express";
import { getPaystackWebhook } from "../../lib/payments";
import response from "../../utils/response";

const webhooksRouter = Router();

// create a product
webhooksRouter.post(
  "/webhooks/paystack",
  getPaystackWebhook,
  (req: Request & { paystack: any }, res: Response) => {
    console.log({ paystack: req.paystack });

    res.send(response("transaction complete"));
  }
);

export default webhooksRouter;
