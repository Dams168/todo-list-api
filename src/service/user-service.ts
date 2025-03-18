import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createUserRequest,
  toUserResponse,
  userResponse,
} from "../model/user-model";
import { userValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

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
}
