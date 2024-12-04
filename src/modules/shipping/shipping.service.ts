import { Schema } from "mongoose";
import { ShippingModel } from "./shipping.model";
import { IShipping } from "./shipping.types";

class ShippingService {
  async getShippingPrices() {
    return await ShippingModel.find();
  }

  async createOrUpdateService(itemData: IShipping) {
    const { type } = itemData;

    // Check if an item with the given type exists
    let item = await ShippingModel.findOne({ type });

    if (item) {
      // Update the existing item
      return await ShippingModel.findOneAndUpdate({ type }, itemData);
    } else {
      // Create a new item
      return await ShippingModel.create({ type, ...itemData });
    }
  }

  // async updateShippingPrices(items: IShipping[]) {
  //   items.map((item) => {
  //     return ShippingModel.findOneAndUpdate(
  //       { type: item.type },
  //       {
  //         $set: {
  //           price: item.price, // Update fields
  //         },
  //         $setOnInsert: { type: item.type }, // Ensure slug is set on insert
  //       },
  //       { upsert: true, returnDocument: "after" } // Ensure upsert and return updated doc
  //     );
  //   });
  // }
}

export default new ShippingService();
