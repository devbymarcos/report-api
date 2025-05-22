import fp from "fastify-plugin";
import fastifyjwt from "@fastify/jwt";

export default fp(async (app) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  app.register(fastifyjwt, {
    secret: process.env.JWT_SECRET as string,
  });
});
