import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm"], // Build for commonJS and ESmodules
    clean: true,
    outDir: './public/dist',
});