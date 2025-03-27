import express from "express";
import { publicRouter } from "../router/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../router/api";

export const app = express();
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(publicRouter);
app.use(apiRouter);
app.use(errorMiddleware);
