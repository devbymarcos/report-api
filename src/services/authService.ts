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
    return { success: false, token: null, message: "Usuário não econtrado" };
  }
  const userVerify = await verifyPassword(password, user.password);
  if (!userVerify) {
    return { success: false, token: null, message: "Senha incorreta" };
  }

  const jwtToken = fastify.jwt.sign({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  return { success: true, token: jwtToken, message: "Acesso ok" };
}
