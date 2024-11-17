import * as Yup from "yup";

export const updateUserValidationSchema = Yup.object({
  name: Yup.string(),
  country: Yup.string(),
  state: Yup.string(),
  street: Yup.string(),
  city: Yup.string(),
  zipcode: Yup.string().matches(/^\d+$/, "Zipcode must be numeric"),
});
