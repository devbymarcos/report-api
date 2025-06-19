import { FastifyInstance } from "fastify";
import { userTypeController } from "controller/userTypeController";

export default async function userTypeRouter(app: FastifyInstance) {
  app.post("/usertype", {
    preHandler: [app.authenticate],
    handler: userTypeController,
  });
}
