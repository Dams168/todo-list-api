import { User } from "@prisma/client";
import {
  createTodoRequest,
  todoResponse,
  toTodoResponse,
} from "../model/todo-model";
import { Validation } from "../validation/validation";
import { TodoValidation } from "../validation/todo-validation";
import { prismaClient } from "../application/database";

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
}
