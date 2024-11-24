import express, { Router } from "express";
import { isAdminAuthenticated } from "../../middlewares/index";
import validator from "../../middlewares/validator";
import { addProductValidationSchema } from "./product.validators";
import {
  createAProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "./product.controller";

const productRouter = Router();

// get all products
productRouter.get("/products", getAllProducts);

// create a product
productRouter.post(
  "/products",
  isAdminAuthenticated,
  validator(addProductValidationSchema),
  createAProduct
);

// update product
productRouter.put(
  "/products/:id",
  isAdminAuthenticated,
  validator(addProductValidationSchema),
  updateProduct
);

// delete a product
productRouter.delete("/products/:id", isAdminAuthenticated, deleteProduct);

export default productRouter;
