import fp from "fastify-plugin";
import fastifyjwt from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";

export default fp(async (app) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  app.register(fastifyjwt, {
    secret: process.env.JWT_SECRET as string,
  });

  app.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify(); // verifica o token JWT
      } catch (err) {
        reply.status(401).send({ message: "Token inválido ou ausente" });
      }
    }
  );
});
