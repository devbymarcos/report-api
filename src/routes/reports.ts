import { FastifyInstance } from "fastify";

export default async function reportRouter(app: FastifyInstance) {
  app.post("/report", async (req, res) => {
    console.log(req.body);

    return res.status(200).send({
      success: true,
      message: "Report received",
      data: req.body,
    });
  });
}
