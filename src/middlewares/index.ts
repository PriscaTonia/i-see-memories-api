import express, { NextFunction, Request, Response } from "express";
import { merge, get } from "lodash";
import { UnAuthorizedError } from "../config/errors";
import authService from "../modules/auth/auth.service";
import usersService from "../modules/users/users.service";
import adminService from "../modules/admin/admin.service";

// is authenticated?
export const isAuthenticated = async function (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) {
  const authToken =
    req.cookies?.["ism-auth-token"] || req.headers?.["ism-auth-token"];

  if (!authToken) throw new UnAuthorizedError();

  try {
    const decoded = authService.verifyAuthToken(authToken);
    const user = await usersService.getUsersById(decoded._id, {
      isDeleted: false,
    });

    if (!user) throw new UnAuthorizedError();
    //@ts-ignore
    req.user = user._doc;
    next();
  } catch (error) {
    // console.log(error?.name);
    const errors = ["TokenExpiredError", "NotBeforeError", "JsonWebTokenError"];
    if (errors.includes(error?.name)) {
      throw new UnAuthorizedError();
    }
    next(error);
  }
};

// is admin authenticated?
export const isAdminAuthenticated = async function (
  req: Request & { admin?: any },
  res: Response,
  next: NextFunction
) {
  const authToken =
    req.cookies?.["ism-admin-token"] || req.headers?.["ism-admin-token"];

  if (!authToken) throw new UnAuthorizedError();

  try {
    const decoded = adminService.verifyAuthToken(authToken);
    const admin = await adminService.getAdminById(decoded._id);

    if (!admin) throw new UnAuthorizedError();

    //@ts-ignore
    req.admin = admin._doc;

    next();
  } catch (error) {
    const errors = ["TokenExpiredError", "NotBeforeError", "JsonWebTokenError"];
    if (errors.includes(error?.name)) {
      throw new UnAuthorizedError();
    }
    next(error);
  }
};
