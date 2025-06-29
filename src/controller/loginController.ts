import { FastifyRequest, FastifyReply } from "fastify";
import { authService } from "services/authService";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function loginController(req: FastifyRequest, res: FastifyReply) {
  const app = req.server;
  const { email, password } = req.body as {
    email: string;
    password: string;
  };
  const verifySchema = loginSchema.safeParse({
    email,
    password,
  });

  if (!verifySchema.success) {
    return res.status(400).send({
      success: false,
      message: verifySchema.error,
      data: null,
    });
  }

  const { success, token, message } = await authService(
    email,
    password,
    req.server
  );

  if (!success) {
    return res.status(401).send({
      success: false,
      message: message,
      data: null,
    });
  }
  return res.status(200).send({
    success: true,
    message: message,
    token,
  });
}
