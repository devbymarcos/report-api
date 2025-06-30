import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"], // <- aqui o importante
  target: "node22",
  outDir: "dist",
  sourcemap: true,
  clean: true,
});
