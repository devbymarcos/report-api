import { FastifyRequest, FastifyReply } from "fastify";
import { createUserType } from "services/userTypeService";
import { z } from "zod";

const userTypeSchema = z.object({
  name: z.string().min(4, "Name is required"),
});

export async function userTypeController(
  req: FastifyRequest,
  res: FastifyReply
) {
  console.log(req.user);
  const { name } = req.body as { name: string };
  const result = userTypeSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).send({
      success: false,
      message: "Name is required",
      data: null,
    });
  }

  try {
    const userType = await createUserType({ name });
    return res.status(201).send({
      success: true,
      message: "User type created successfully",
      data: userType,
    });
  } catch (error) {
    console.error("Error creating user type:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
}
