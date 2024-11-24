import Picture from "./pictures.model";
import { IPicture } from "./pictures.types";

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

  // creating a single image
  async create(picture: IPicture) {
    return await Picture.create(picture);
  }

  async delete(id: string) {
    return await Picture.findByIdAndDelete(id);
  }

  async deleteByUrl(url: string) {
    return await Picture.findOneAndDelete({ url });
  }
}

export default new PictureService();
