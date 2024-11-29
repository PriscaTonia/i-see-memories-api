import express, { Request, Response, Router } from "express";
import { getPaystackWebhook } from "../../lib/payments";
import response from "../../utils/response";

const webhooksRouter = Router();

// create a product
webhooksRouter.post("/webhooks/paystack", (req: Request, res: Response) => {
  const payload = getPaystackWebhook(req);
  console.log({ paystack: payload });

  res.send(response("transaction complete"));
});

export default webhooksRouter;
