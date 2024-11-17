import { Router } from "express";

import { LoginUser, RegisterUser } from "./auth.controller";
import validator from "../../middlewares/validator";
import { addUserValSchema, loginValSchema } from "./auth.validators";

const router = Router();

// @ts-ignore
router.post("/auth/signup", validator(addUserValSchema), RegisterUser);
// @ts-ignore
router.post("/auth/login", validator(loginValSchema), LoginUser);

export default router;
