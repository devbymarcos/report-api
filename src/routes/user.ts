import { FastifyInstance } from "fastify";
import { userController } from "../controller/userController";

export default async function userRouter(app: FastifyInstance) {
  app.post("/user", userController);
}
