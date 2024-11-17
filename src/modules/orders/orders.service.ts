import { OrderModel } from "./orders.model";
import { IOrderReq, OrderStatusEnum } from "./orders.types";
import { Schema } from "mongoose";

class OrderService {
  async getOrders() {
    return await OrderModel.find({ status: OrderStatusEnum.Paid });
  }
  async getOrdersById(_id: string) {
    return await OrderModel.findOne({ _id });
  }
  async createOrderByUserId(createdOrderDto: IOrderReq) {
    return await OrderModel.create(createdOrderDto);
  }
  async getOrdersByUserId(userId: Schema.Types.ObjectId) {
    return await OrderModel.find({ userId, status: OrderStatusEnum.Paid });
  }
  async getCartByUserId(userId: Schema.Types.ObjectId) {
    return await OrderModel.find({ userId, status: OrderStatusEnum.Cart });
  }

  async updateOrderById(id: string, updateQuery: { [key: string]: any }) {
    return OrderModel.findByIdAndUpdate(id, updateQuery, { new: true });
  }
}

export default new OrderService();
