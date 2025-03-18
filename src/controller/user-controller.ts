import { NextFunction, Request, Response } from "express";
import { createUserRequest } from "../model/user-model";
import { userService } from "../service/user-service";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: createUserRequest = req.body as createUserRequest;
      const response = await userService.register(request);

      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
}
