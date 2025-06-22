import { FastifyRequest, FastifyReply } from "fastify";

export async function formController(req: FastifyRequest, res: FastifyReply) {
  const { content } = req.body as { content: string };

  // Here you would typically process the form data, e.g., save it to a database
  // For demonstration, we'll just return the received data

  return res.status(200).send({
    success: true,
    message: "Form submitted successfully",
    data: content,
  });
}
