import { Schema } from "mongoose";
import Picture from "./pictures.model";
import { IPicture } from "./pictures.types";
import { deleteFromCloud } from "../../lib/cloudinary";

class PictureService {
  async findAll() {
    return await Picture.find();
  }
  async findByUrl(url: string) {
    return await Picture.findOne({ url });
  }

  // creating multiple images at once
  async createBulk(picture: IPicture[]) {
    return await Picture.create(picture);
  }

  // find images by order and itemId
  async findPicturesByFilter(
    orderId: Schema.Types.ObjectId,
    itemId: Schema.Types.ObjectId
  ) {
    return await Picture.find({
      order: orderId,
      itemId,
    });
  }

  // creating a single image
  async create(picture: IPicture) {
    return await Picture.create(picture);
  }

  // delete a picture by id
  async delete(id: string) {
    return await Picture.findByIdAndDelete(id);
  }

  // delete from cloudinaru
  async deletePictureFromCloud(public_id: string) {
    await deleteFromCloud(public_id);
  }

  // delete many from db
  async deleteManyFromDB(public_ids: string[]) {
    await Picture.deleteMany({ public_id: { $in: public_ids } });
  }

  // delete by url
  async deleteByUrl(url: string) {
    return await Picture.findOneAndDelete({ url });
  }
}

export default new PictureService();
