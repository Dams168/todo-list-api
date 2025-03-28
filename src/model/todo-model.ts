import { Todos, User } from "@prisma/client";

export type todoResponse = {
  id: number;
  title: string;
  description: string;
};

export type createTodoRequest = {
  title: string;
  description: string;
};

export type updateTodoRequest = {
  id: number;
  title?: string;
  description?: string;
};

export type deleteTodoRequest = {
  id: number;
};

export function toTodoResponse(todo: Todos): todoResponse {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description,
  };
}
