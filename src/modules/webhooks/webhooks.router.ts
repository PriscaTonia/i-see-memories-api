import express, { Request, Response, Router } from "express";
import { getPaystackWebhook } from "../../lib/payments";
import response from "../../utils/response";

const webhooksRouter = Router();

// create a product
webhooksRouter.post("/webhooks/paystack", (req: Request, res: Response) => {
  const payload = getPaystackWebhook(req);

  if (payload.event !== "charge.success") return res.send(response("nah"));

  console.log({
    event: payload.event,
    paystack: payload.data,
    metadata: payload.data.metadata,
  });

  res.send(response("transaction complete"));
});

export default webhooksRouter;
