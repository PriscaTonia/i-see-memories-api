import { OrderModel } from "./orders.model";
import { IOrder, IOrderReqItem, OrderStatusEnum } from "./orders.types";
import { Schema } from "mongoose";

class OrderService {
  async getOrders() {
    return await OrderModel.find({ status: OrderStatusEnum.Paid }).populate({
      path: "items.productId", // Populates the `productId` field
      select: "price pageCount isDeleted", // Select specific fields
    });
  }

  async getOrdersById(_id: string) {
    return await OrderModel.findOne({ _id });
  }

  async deleteOrderById(id: string) {
    return await OrderModel.findByIdAndDelete(id);
  }

  async addItemsToCart(userId: Schema.Types.ObjectId, items: IOrderReqItem[]) {
    return OrderModel.findOneAndUpdate(
      { userId, status: OrderStatusEnum.Cart }, // Query to find the order
      {
        $set: { items }, // Replace or update the `items` field
        $setOnInsert: { userId, status: OrderStatusEnum.Cart }, // Add these fields only on insert
      },
      { upsert: true, returnDocument: "after" } // Ensure upsert and return updated doc
    );
  }

  async getOrdersByUserId(userId: Schema.Types.ObjectId) {
    return await OrderModel.find({
      userId,
      status: OrderStatusEnum.Paid,
    }).populate({
      path: "items.productId", // Populates the `productId` field
      select: "price pageCount isDeleted", // Select specific fields
    });
  }

  // get cart items
  async getCartByUserId(userId: Schema.Types.ObjectId) {
    return (
      await OrderModel.findOne({ userId, status: OrderStatusEnum.Cart })
    ).populate({
      path: "items.productId", // Populates the `productId` field
      select: "price pageCount isDeleted", // Select specific fields
    });
  }

  // update order
  async updateOrderById(id: string, updateQuery: { [key: string]: any }) {
    return OrderModel.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  // update shipping for an order
  async updateOrderShippingById(
    id: string,
    shippingDetails: { [key: string]: any }
  ) {
    return OrderModel.findByIdAndUpdate(
      id,
      { $set: { shippingDetails } }, // Use $set to update the shippingDetails field
      { new: true }
    ); // Return the updated document);
  }
}

export default new OrderService();
