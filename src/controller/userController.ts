import { FastifyRequest, FastifyReply } from "fastify";
import { createUser } from "services/userService";
import { hashPassword } from "util/authUtils";

export async function userController(req: FastifyRequest, res: FastifyReply) {
  const { name, email, password, userTypeId } = req.body as {
    name: string;
    email: string;
    password: string;
    userTypeId: string;
  };

  if (!name || !email || !password) {
    return res.status(400).send({
      success: false,
      message: "Name, email, and password are required",
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
    console.log("Error creating user:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
}
