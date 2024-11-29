import express from "express";
import usersRouter from "../modules/users/users.router";
import authRouter from "../modules/auth/auth.router";
import orderRouter from "../modules/orders/orders.router";
import adminRouter from "../modules/admin/admin.router";
import productRouter from "../modules/product/product.router";
import templateRouter from "../modules/template/template.router";
import pictureRouter from "../modules/pictures/pictures.router";
import webhooksRouter from "../modules/webhooks/webhooks.router";

const router = express.Router();

router.use(authRouter);
router.use(usersRouter);
router.use(orderRouter);
router.use(adminRouter);
router.use(productRouter);
router.use(templateRouter);
router.use(pictureRouter);
router.use(webhooksRouter);

export default router;
