import { ProductModel } from "./product.model";
import { IProduct, IProductReq } from "./product.types";

class ProductService {
  async getProducts() {
    return await ProductModel.find({ isDeleted: false });
  }
  async createProductByAdminId(createdProductDto: IProductReq) {
    return await ProductModel.create(createdProductDto);
  }
  async updateProductById(id: string, updateQuery: { [key: string]: any }) {
    return ProductModel.findByIdAndUpdate(id, updateQuery, { new: true });
  }
  async deleteProductById(id: string) {
    return await ProductModel.findByIdAndUpdate(id, { isDeleted: true });
  }
}

export default new ProductService();
