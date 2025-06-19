import { FastifyRequest, FastifyReply } from "fastify";
import { createUser } from "services/userService";
import { hashPassword } from "util/authUtils";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  userTypeId: z.string().optional(),
});

export async function userController(req: FastifyRequest, res: FastifyReply) {
  const { name, email, password, userTypeId } = req.body as {
    name: string;
    email: string;
    password: string;
    userTypeId: string;
  };
  const verifySchema = userSchema.safeParse({
    name,
    email,
    password,
    userTypeId,
  });

  if (!verifySchema.success) {
    return res.status(400).send({
      success: false,
      message: verifySchema.error,
      data: null,
    });
  }
  const passwordHash = await hashPassword(password);

  try {
    const user = await createUser({
      name,
      email,
      password: String(passwordHash),
      userTypeId: Number(userTypeId),
    });
    return res.status(201).send({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      data: null,
    });
  }
}
