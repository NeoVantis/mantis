import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { defineConfig } from "rollup";
import * as ts from "typescript";

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  external: ["react", "react-dom"],
  plugins: [
    postcss({
      extract: true,
      minimize: true,
    }),
    typescript({
      typescript: ts,
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
  ],
});
