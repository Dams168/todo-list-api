import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import {
  createTodoRequest,
  deleteTodoRequest,
  getAllTodoRequest,
  updateTodoRequest,
} from "../model/todo-model";
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

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: updateTodoRequest = req.body as updateTodoRequest;
      request.id = parseInt(req.params.todoId);
      const response = await todoService.update(req.user!, request);
      logger.debug("response = " + JSON.stringify(response));
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: deleteTodoRequest = req.body as deleteTodoRequest;
      request.id = parseInt(req.params.todoId);
      const response = await todoService.delete(req.user!, request);
      res.status(204).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async getAll(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: getAllTodoRequest = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
      };
      const response = await todoService.getAll(request);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
