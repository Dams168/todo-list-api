import { User } from "@prisma/client";

export type userResponse = {
  name: string;
  email: string;
  token?: string;
};

export type createUserRequest = {
  name: string;
  email: string;
  password: string;
};

export function toUserResponse(user: User): userResponse {
  return {
    name: user.name,
    email: user.email,
  };
}
