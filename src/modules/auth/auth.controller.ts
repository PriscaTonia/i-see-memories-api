import { Request, Response } from "express";
import usersService from "../users/users.service";
import response from "../../utils/response";
import authService from "./auth.service";
import { UnAuthorizedError } from "../../config/errors";
import { omit } from "lodash";

export const RegisterUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await usersService.createUser({ email, password });

  res.send(response("User created successfully", user));
};

export const LoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await usersService.getUsersByEmail(email);

  if (!user) throw new UnAuthorizedError("Invalid Email or Password");

  const isValidPassword = await authService.validPassword(
    password,
    user.password
  );

  if (!isValidPassword)
    throw new UnAuthorizedError("Invalid Email or Password");

  // @ts-ignore
  const filteredUser = omit(user._doc, ["password", "__v"]);

  const jwt = authService.generateAuthToken(filteredUser);

  res.send(response("User login successful", { user: filteredUser, jwt }));
};
