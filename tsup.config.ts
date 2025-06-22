import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"], // <- aqui o importante
  target: "node22",
  outDir: "dist",
  sourcemap: true,
  clean: true,
});
