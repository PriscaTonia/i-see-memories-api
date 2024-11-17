export interface IProductReq {
  pageCount: string;
  price: number;
}

export interface IProduct extends IProductReq {
  isDeleted: boolean;
}
