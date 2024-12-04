import * as Yup from "yup";

// shipping prices update
export const updateShippingValidationSchema = Yup.array(
  Yup.object({
    label: Yup.string(),
    price: Yup.number(),
    type: Yup.string(),
  })
);
