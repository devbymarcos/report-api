import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["cjs"], // <- aqui o importante
  target: "node22",
  outDir: "dist",
  sourcemap: true,
  clean: true,
});
