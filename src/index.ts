import Fastify from "fastify";
import sensible from "@fastify/sensible";
import autoload from "@fastify/autoload";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  },
});
app.register(sensible);
app.register(autoload, {
  dir: path.join(__dirname, "plugins"),
});
app.register(autoload, {
  dir: path.join(__dirname, "routes"),
});

export default app;
