import * as Yup from "yup";

export const addProductValidationSchema = Yup.object({
  pageCount: Yup.string().required("Page Count is required"),
  price: Yup.number().required("Price is required"),
});
