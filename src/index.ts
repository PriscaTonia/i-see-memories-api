import "express-async-errors";
import env from "./config/env";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import router from "./router";
import errorMiddleware from "./middlewares/error";
import { NotFoundError } from "./config/errors";
import openDBConnection from "./config/db";

const app = express();
const PORT = env.PORT;
const mode = env.NODE_ENV;

// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use("/api/v1", router);

// Database connection
openDBConnection();
// Error Handling
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

// @ts-ignore
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${mode} mode`);
});
