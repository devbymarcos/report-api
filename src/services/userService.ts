import { prisma } from "database/prismaClient";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password, // Ensure to hash the password before storing it in production
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error creating user");
  }
}
