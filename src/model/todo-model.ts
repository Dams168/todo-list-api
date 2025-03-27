import { Todos } from "@prisma/client";

export type todoResponse = {
  id: number;
  title: string;
  description: string;
};

export type createTodoRequest = {
  title: string;
  description: string;
};

export function toTodoResponse(todo: Todos): todoResponse {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description,
  };
}
