import "express-async-errors";
import env from "../src/config/env";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import router from "../src/router";
import errorMiddleware from "../src/middlewares/error";
import { NotFoundError } from "../src/config/errors";
import openDBConnection from "../src/config/db";

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
app.use("/ping", (req, res) => res.send(`Live`));
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
