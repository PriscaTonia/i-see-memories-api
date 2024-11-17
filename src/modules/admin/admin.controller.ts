import { Request, Response } from "express";
import response from "../../utils/response";
import { UnAuthorizedError } from "../../config/errors";
import { omit } from "lodash";
import adminService from "./admin.service";

export const RegisterAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = await adminService.createAdmin({ email, password });

  res.send(response("Admin created successfully", admin));
};

export const LoginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = await adminService.getAdminByEmail(email);

  if (!admin) throw new UnAuthorizedError("Invalid Email or Password");

  const isValidPassword = await adminService.validPassword(
    password,
    admin.password
  );

  if (!isValidPassword)
    throw new UnAuthorizedError("Invalid Email or Password");

  // @ts-ignore
  const filteredUser = omit(admin._doc, ["password", "__v"]);

  const jwt = adminService.generateAuthToken(filteredUser);

  res.send(response("Admin login successful", { user: filteredUser, jwt }));
};
