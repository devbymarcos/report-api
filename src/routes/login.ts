import { FastifyInstance } from "fastify";
import { loginController } from "../controller/loginController";

export default async function loginRouter(app: FastifyInstance) {
  app.post("/auth", loginController);
}
