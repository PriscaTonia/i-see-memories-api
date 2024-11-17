import * as Yup from "yup";

export const addTemplateValidationSchema = Yup.object({
  frontCover: Yup.string()
    .url("Front cover must be a valid URL")
    .required("Front cover  is required"),
  fullCover: Yup.string()
    .url("Full cover must be a valid URL")
    .required("Full cover  is required"),
  name: Yup.string().required("Template name is required"),
});
