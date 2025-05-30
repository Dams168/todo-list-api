import express from "express";
import { UserController } from "../controller/user-controller";

export const publicRouter = express.Router();

publicRouter.post("/register", UserController.register);
publicRouter.post("/login", UserController.login);
publicRouter.get("/", (req, res) => {
  res.json("HELLO WORLD!");
});
