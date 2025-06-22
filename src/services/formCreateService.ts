import { prisma } from "database/prismaClient";

export async function formCreateService(data: { content: string }) {
  try {
    const { content } = data;

    const report = await prisma.forms.create({
      data: {
        content,
      },
    });

    return {
      success: true,
      message: "Form created successfully",
      data: report,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Form");
  }
}
