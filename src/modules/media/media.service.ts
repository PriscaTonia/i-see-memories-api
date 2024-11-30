import { Schema } from "mongoose";
import { IMedia } from "./media.types";
import Media from "./media.model";

class MediaService {
  async findAll() {
    return await Media.find();
  }
  async findByUrl(url: string) {
    return await Media.findOne({ url });
  }

  // creating multiple images at once
  async createBulk(picture: IMedia[]) {
    return await Media.create(picture);
  }

  // find images by order and itemId
  async findMediasByFilter(
    orderId: Schema.Types.ObjectId,
    itemId: Schema.Types.ObjectId
  ) {
    return await Media.find({
      order: orderId,
      itemId,
    });
  }

  // creating a single image
  async create(picture: IMedia) {
    return await Media.create(picture);
  }

  async delete(id: string) {
    return await Media.findByIdAndDelete(id);
  }

  async deleteByUrl(url: string) {
    return await Media.findOneAndDelete({ url });
  }
}

export default new MediaService();
