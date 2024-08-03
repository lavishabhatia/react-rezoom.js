import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
// import packageJson from "./package.json";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "./lib/index.js",
                format: "cjs",
                sourcemap: true,
            },
        ],
        plugins: [
            resolve({
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                exclude: ["react", "react-dom"],
            }),
            commonjs(),
            typescript({
                tsconfig: "./tsconfig.json",
                exclude: ["**/*.test.tsx", "**/*.test.ts", "**/*.stories.ts"],
            }),
            postcss({ extensions: [".css"], inject: true, extract: false }),
        ],
        external: ["react", "react-dom", "react/jsx-runtime"],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
        external: [/\.css$/],
    },
];
