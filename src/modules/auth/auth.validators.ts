import * as Yup from "yup";

export const addUserValSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const loginValSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});
