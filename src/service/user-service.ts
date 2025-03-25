import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createUserRequest,
  loginUserRequest,
  toUserResponse,
  userResponse,
} from "../model/user-model";
import { userValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class userService {
  static async register(request: createUserRequest): Promise<userResponse> {
    const registerRequest = Validation.validate(
      userValidation.REGISTER,
      request
    );

    const totalUsersWithSameEmail = await prismaClient.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (totalUsersWithSameEmail > 0) {
      throw new ResponseError(400, "User with same name already exists");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(user);
  }

  static async login(request: loginUserRequest): Promise<userResponse> {
    const loginRequest = Validation.validate(userValidation.LOGIN, request);

    let user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Email or Password is incorrect");
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ResponseError(401, "Email or Password is incorrect");
    }

    user = await prismaClient.user.update({
      where: {
        email: loginRequest.email,
      },
      data: {
        token: uuid(),
      },
    });

    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
  }
}
