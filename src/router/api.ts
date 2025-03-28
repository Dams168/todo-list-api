import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { TodoController } from "../controller/todo-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

//TODO API
apiRouter.post("/todos", TodoController.create);
apiRouter.get("/todos", TodoController.getAll);
apiRouter.put("/todos/:todoId(\\d+)", TodoController.update);
apiRouter.delete("/todos/:todoId(\\d+)", TodoController.delete);
