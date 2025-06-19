import { prisma } from "database/prismaClient";
import { FastifyInstance } from "fastify";
import { verifyPassword } from "util/authUtils";

export async function authService(
  email: string,
  password: string,
  fastify: FastifyInstance
) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  const userVerify = await verifyPassword(password, user.password);
  if (!userVerify) {
    return { success: false, token: null };
  }

  const jwtToken = fastify.jwt.sign({
    id: user.id,
    email: user.email,
  });
  return { success: true, token: jwtToken };
}
