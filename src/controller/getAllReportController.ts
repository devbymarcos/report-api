import { FastifyRequest, FastifyReply } from "fastify";
import { getAllReportService } from "services/getAllReportService";

export async function getAllReportController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const reports = await getAllReportService();
  console.log(reports);

  return res.status(200).send({
    success: true,
    message: "Reports retrieved successfully",
    data: reports,
  });
}
