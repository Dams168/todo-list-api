import { Todos, User } from "@prisma/client";
import {
  createTodoRequest,
  deleteTodoRequest,
  todoResponse,
  toTodoResponse,
  updateTodoRequest,
} from "../model/todo-model";
import { Validation } from "../validation/validation";
import { TodoValidation } from "../validation/todo-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { logger } from "../application/logging";

export class todoService {
  static async create(
    user: User,
    request: createTodoRequest
  ): Promise<todoResponse> {
    const createRequest = Validation.validate(TodoValidation.CREATE, request);

    const todo = await prismaClient.todos.create({
      data: {
        title: createRequest.title,
        description: createRequest.description,
        userId: user.id,
      },
    });

    return toTodoResponse(todo);
  }

  static async checkTodoMustExist(
    userId: string,
    todoId: number
  ): Promise<Todos> {
    const todo = await prismaClient.todos.findFirst({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      throw new ResponseError(404, "Todo not found");
    }

    return todo;
  }

  static async update(
    user: User,
    request: updateTodoRequest
  ): Promise<todoResponse> {
    const updateRequest = Validation.validate(TodoValidation.UPDATE, request);
    const checkTodo = await this.checkTodoMustExist(user.id, updateRequest.id);

    if (user.id !== checkTodo.userId) {
      throw new ResponseError(403, "Forbidden");
    }

    const todo = await prismaClient.todos.update({
      where: {
        id: updateRequest.id,
      },
      data: updateRequest,
    });

    return toTodoResponse(todo);
  }

  static async delete(
    user: User,
    request: deleteTodoRequest
  ): Promise<todoResponse> {
    const updateRequest = Validation.validate(TodoValidation.GET, request);
    await this.checkTodoMustExist(user.id, updateRequest.id);

    const todo = await prismaClient.todos.delete({
      where: {
        id: updateRequest.id,
      },
    });

    return toTodoResponse(todo);
  }
}
