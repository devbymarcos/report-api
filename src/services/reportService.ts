import { prisma } from "database/prismaClient";

export async function createReport(data: {
  idTicket: string;
  content: string;
  userId: number;
  closingDatetime: Date;
}) {
  try {
    const { idTicket, content, userId, closingDatetime } = data;

    const report = await prisma.report.create({
      data: {
        idTicket,
        content,
        userId,
        closingDatetime,
      },
    });

    return {
      success: true,
      message: "Report created successfully",
      data: report,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create report");
  }
}
