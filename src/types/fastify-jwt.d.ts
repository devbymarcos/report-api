import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    jwt: import("@fastify/jwt").JWT;
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}
