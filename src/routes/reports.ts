import { reportController } from "controller/reportController";
import { FastifyInstance } from "fastify";

export default async function reportRouter(app: FastifyInstance) {
  app.post("/report", reportController);
}
