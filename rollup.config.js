import typescript from "@rollup/plugin-typescript";
import cleaner from "rollup-plugin-cleaner";
import commonjs from "@rollup/plugin-commonjs";
import packageJson from "./package.json";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    }
  ],
  plugins: [
    cleaner({
      targets: ["./dist"],
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
  ],
};
