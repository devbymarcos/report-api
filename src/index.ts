import Fastify from "fastify";
import autoload from "@fastify/autoload";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import cors from "@fastify/cors";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

await app.register(cors);
app.register(autoload, {
  dir: path.join(__dirname, "plugins"),
});
app.register(autoload, {
  dir: path.join(__dirname, "routes"),
});

export default app;
