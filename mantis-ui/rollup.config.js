const typescript = require("rollup-plugin-typescript2");
const postcss = require("rollup-plugin-postcss");
const ts = require("typescript");

module.exports = {
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
  external: ["react", "react-dom", "react/jsx-runtime"],
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
};
