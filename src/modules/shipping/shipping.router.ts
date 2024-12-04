import { Router } from "express";
import { isAdminAuthenticated } from "../../middlewares/index";
import validator from "../../middlewares/validator";
import { updateShippingValidationSchema } from "./shipping.validators";
import {
  getAllShippingPrices,
  updateShippingPrice,
} from "./shipping.controller";

const shippingRouter = Router();

// get all shipping prices
shippingRouter.get("/shipping", getAllShippingPrices);

// create is done by a script

// update shipping prices
shippingRouter.put(
  "/shipping",
  isAdminAuthenticated,
  validator(updateShippingValidationSchema),
  updateShippingPrice
);

export default shippingRouter;
