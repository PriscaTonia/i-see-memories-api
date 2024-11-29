import express, { Request, Response } from "express";
import userService from "./users.service";
import response from "../../utils/response";
import { omit } from "lodash";
import usersService from "./users.service";
import { IUser } from "./users.types";
import ordersService from "../orders/orders.service";
import axios from "axios";
import env from "../../config/env";
import { IProduct } from "../product/product.types";
import { ProductModel } from "../product/product.model";

// CART

export const addItemsToCart = async (
  req: Request & { user: IUser } & { product: IProduct },
  res: Response
) => {
  const items = req.body;
  const userId = req.user._id;

  const newOrder = await ordersService.addItemsToCart(userId, items);

  res.send(response("Item added to Cart", newOrder));
};

// get a user's cart controller
export const getAUserCart = async (
  req: express.Request & { user: IUser },
  res: express.Response
) => {
  const id = req.user._id;
  const cart = await ordersService.getCartByUserId(id);

  res.send(response("Cart List", cart));
};

// update a user's order for shipping controller
export const updateShipping = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;
  const updateBody = req.body;

  const updatedOrder = await ordersService.updateOrderShippingById(
    id,
    updateBody
  );

  if (!updatedOrder) {
    return res
      .status(404)
      .send(response("Cart Item Shipping not found", null, false));
  }

  res.send(response("Cart Item Shipping updated successfully", updatedOrder));
};

// ORDERS

// get a user's orders controller
export const getAUserOrders = async (
  req: express.Request & { user: IUser },
  res: express.Response
) => {
  const id = req.user._id;
  const orders = await ordersService.getOrdersByUserId(id);

  res.send(response("Orders List", orders));
};

// get a single order
export const getASingleOrder = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const order = await ordersService.getOrdersById(id);

  res.send(response("Single Order Info", order));
};

// USER

// get user controller
export const getUser = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const user = await userService.getUsersById(id);

  // @ts-ignore
  const filteredUser = omit(user._doc, ["password", "__v"]);

  res.send(response("User Info", filteredUser));
};

// delete a user controller
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  const deletedUser = await userService.deleteUserById(id);

  return res.status(200).send({
    success: true,
    message: "User Deleted Successfully",
    data: deletedUser,
  });
};

// update a user
export const updateUser = async (
  req: Request & { user: IUser },
  res: Response
) => {
  const id = req.user._id;
  const updateBody = req.body;

  const updatedUser = await usersService.updateUserById(id, updateBody);

  if (!updatedUser) {
    return res.status(404).send(response("User not found", null, false));
  }

  // @ts-ignore
  const filteredUser = omit(updatedUser._doc, ["password", "__v"]);

  res.send(response("User updated successfully", filteredUser));
};

// PAYMENT
export const createPayment = async (
  req: Request & { user: IUser },
  res: Response
) => {
  try {
    const id = req.user._id;
    const cart = await ordersService.getCartByUserId(id); // Fetch the cart

    // Calculate the total amount
    const totalAmount = cart.items.reduce((sum, item) => {
      // @ts-ignore
      const itemPrice = item.productId?.price || 0;
      const quantity = item.quantity || 0;
      return sum + itemPrice * quantity;
    }, 0);

    const email = req.user.email;

    // Convert amount to kobo for Paystack (assuming NGN)
    const amountInKobo = totalAmount * 100;

    // Paystack API endpoint and secret key
    const PAYSTACK_SECRET_KEY = env.PAYSTACK_SECRET_KEY;
    const PAYSTACK_BASE_URL = "https://api.paystack.co";

    // Make the API call to Paystack
    const paystackResponse = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: amountInKobo,
        metadata: { orderId: cart?._id },
        order_id: cart?._id,
      }, // Amount in kobo for Paystack
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the data returned by Paystack
    const { data } = paystackResponse;

    if (data && data.status) {
      res.send(response("Payment initiated successfully", data.data));
    } else {
      throw new Error(data.message || "Failed to initiate payment");
    }
  } catch (error: any) {
    console.error("Error initiating payment:", error.message);

    return res.status(500).send({
      success: false,
      message: "An error occurred while initiating payment",
      error: error.response?.data || error.message,
    });
  }
};
