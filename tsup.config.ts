import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  bundle: true,
  splitting: true,
  minify: process.env.NODE_ENV === "production",
  outDir: "dist",
  format: ["esm"],
  dts: true,
  // 打入pollyfill
  shims: true,
  clean: true,
});
