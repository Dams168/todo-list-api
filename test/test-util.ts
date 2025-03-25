import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";

export class UserTest {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        email: "test@mail.com",
      },
    });
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        name: "test",
        email: "test@mail.com",
        password: await bcrypt.hash("password", 10),
        token: "test",
      },
    });
  }
}
