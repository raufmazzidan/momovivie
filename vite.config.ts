import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    ...configDefaults,
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    include: ["src/**/*.test.tsx", "src/**/*.test.ts"],
    exclude: [
      "src/App.tsx",
      "src/main.tsx",
      "src/pages/index.ts",
      "src/integrations/*.ts",
      "src/types/*.ts",
    ],
    coverage: {
      exclude: [
        "src/App.tsx",
        "src/main.tsx",
        "src/pages/index.ts",
        "src/integrations/*.ts",
        "src/types/*.ts",
      ],
      include: ["src/**/*.tsx", "src/**/*.ts"],
    },
  },
});
