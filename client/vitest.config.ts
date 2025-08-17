import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "happy-dom",
        include: ["./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        reporters: ["basic", "junit"],
        outputFile: "./junit/output.xml",
        coverage: {
            provider: "istanbul",
            reporter: ["text", "cobertura", "html"],
            exclude: ["src/main.tsx", ...(configDefaults.coverage.exclude ?? [])]
        }
    }
});
