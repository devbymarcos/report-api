import { getAllReportController } from "controller/getAllReportController";
import { reportController } from "controller/reportController";
import { FastifyInstance } from "fastify";

export default async function reportRouter(app: FastifyInstance) {
  app.post("/report", {
    preHandler: [app.authenticate],
    handler: reportController,
  });

  app.get("/report", {
    preHandler: [app.authenticate],
    handler: getAllReportController,
  });
}
