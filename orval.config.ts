import { defineConfig } from "orval"

export default defineConfig({
  flow: {
    input: "./openapi/flow.yaml",
    output: "./src/api/flow.ts",
  },
})
