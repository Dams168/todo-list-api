import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { createTodoRequest } from "../model/todo-model";
import { todoService } from "../service/todo-service";
import { logger } from "../application/logging";

export class TodoController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: createTodoRequest = req.body as createTodoRequest;
      const response = await todoService.create(req.user!, request);
      logger.debug("response = " + JSON.stringify(response));
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
}
