import * as Yup from "yup";

export const addPictureValSchema = Yup.object({
  file: Yup.string(),
  pageNo: Yup.number(),
  orderId: Yup.string().matches(
    /^[a-f\d]{24}$/i,
    "Order ID must be a valid MongoDB ObjectId"
  ),
});

// export const addPictureValSchema = Yup.object({
//   files: Yup.array().min(1, "At least one file is required")
//   .required("Files are required"),
// });
