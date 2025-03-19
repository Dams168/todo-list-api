import supertest from "supertest";
import { app } from "../src/application/app";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";

describe("POST /api/user", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should reject register user if request is invalid", async () => {
    const response = await supertest(app).post("/api/users").send({
      email: "",
      password: "",
      name: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should accepted register when request is valid", async () => {
    const response = await supertest(app).post("/api/users").send({
      email: "test@mail.com",
      password: "test",
      name: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.email).toBe("test@mail.com");
    expect(response.body.name).toBe("test");
  });
});
