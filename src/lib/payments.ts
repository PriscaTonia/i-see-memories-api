import env from "../config/env";
import crypto from "crypto";

import { Request } from "express";

export const getPaystackWebhook = (req: Request & { paystack: any }) => {
  const { headers, body } = req;

  const hash = crypto
    .createHmac("sha512", env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(body))
    .digest("hex");

  if (hash !== headers["x-paystack-signature"]) return false;

  req.paystack = body;
};
