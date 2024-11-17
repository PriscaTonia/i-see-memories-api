import { Router } from "express";
import { LoginAdmin, RegisterAdmin } from "./admin.controller";
import validator from "../../middlewares/validator";
import { addAdminValSchema, loginValSchema } from "./admins.validators";

const adminRouter = Router();

// @ts-ignore
adminRouter.post("/admin/signup", validator(addAdminValSchema), RegisterAdmin);

// @ts-ignore
adminRouter.post("/admin/login", validator(loginValSchema), LoginAdmin);

export default adminRouter;
