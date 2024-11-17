import express, { Request, Response } from "express";
import response from "../../utils/response";
import { IAdmin } from "../admin/admin.types";
import productService from "./product.service";

// get products controller
export const getAllProducts = async (
  req: express.Request,
  res: express.Response
) => {
  const products = await productService.getProducts();

  res.send(response("Products", products));
};

// create a product controller
export const createAProduct = async (
  req: Request & { admin: IAdmin },
  res: Response
) => {
  const id = req.admin._id;
  const product = await productService.createProductByAdminId({
    ...req.body,
    userId: id,
  });
  res.send(response("Product created successfully", product));
};

// update a product controller
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateBody = req.body;

  const updatedProduct = await productService.updateProductById(id, updateBody);

  if (!updatedProduct) {
    return res.status(404).send(response("Product not found", null, false));
  }

  res.send(response("Product updated successfully", updatedProduct));
};

// delete a product controller
export const deleteProduct = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  const deletedProduct = await productService.deleteProductById(id);

  res.send(response("Product deleted successfully", deletedProduct));
};
