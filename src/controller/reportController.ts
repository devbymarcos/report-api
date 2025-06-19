import { create } from "domain";
import { FastifyRequest, FastifyReply } from "fastify";
import { report } from "process";
import { createReport } from "services/reportService";
import { z } from "zod";

const reportSchema = z.object({
  idTicket: z.string().min(6, "Ticket ID is required"),
  content: z.string().min(1, "Report type is required"),
  closingDatetime: z.date(),
  userId: z.number().int().positive("User ID must be a positive integer"),
});

export async function reportController(req: FastifyRequest, res: FastifyReply) {
  const { idTicket, content, closingDatetime } = req.body as {
    idTicket: string;
    content: string;
    closingDatetime: Date;
  };
  const { id } = req.user as { id: string };

  const resultValidation = reportSchema.safeParse({
    idTicket: idTicket,
    content: content,
    closingDatetime: new Date(closingDatetime),
    userId: Number(id),
  });

  if (!resultValidation.success) {
    return res.status(400).send({
      success: false,
      message: resultValidation.error,
      data: null,
    });
  }

  const reportCreate = createReport(resultValidation.data);
  console.log(reportCreate);

  return res.status(200).send({
    success: true,
    message: "Report generated successfully",
    data: reportCreate,
  });
}
