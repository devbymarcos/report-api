import { prisma } from "database/prismaClient";

export async function createUserType(data: { name: string }) {
  try {
    const userType = await prisma.userType.create({
      data: {
        name: data.name,
      },
    });
    return userType;
  } catch (error) {
    throw new Error("Error creating user type");
  }
}
