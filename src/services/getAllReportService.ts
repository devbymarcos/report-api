import { prisma } from "database/prismaClient";

export async function getAllReportService() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      success: true,
      message: "Reports retrieved successfully",
      data: reports,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create report");
  }
}
