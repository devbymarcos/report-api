import { prisma } from "database/prismaClient";

export async function createUserService(data: {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN"; // Optional role field, defaulting to "USER"
}) {
  const isEmailExists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (isEmailExists) {
    throw new Error("Email already exists");
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating user");
  }
}
