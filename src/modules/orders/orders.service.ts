import { OrderModel } from "./orders.model";
import { IOrder, IOrderReq, OrderStatusEnum } from "./orders.types";
import { Schema } from "mongoose";

class OrderService {
  async getOrders() {
    return await OrderModel.find({ status: OrderStatusEnum.Paid });
  }
  async getOrdersById(_id: string) {
    return await OrderModel.findOne({ _id });
  }
  async deleteOrderById(id: string) {
    return await OrderModel.findByIdAndDelete(id);
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

  async updateShippingDetailsForOrders(
    ids: Schema.Types.ObjectId[],
    shippingDetails: Pick<IOrder, "shippingDetails">
  ) {
    return OrderModel.updateMany(
      {
        _id: { $in: ids },
      },
      { shippingDetails }
    );
  }
}

export default new OrderService();
