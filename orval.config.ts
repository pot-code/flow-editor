import { defineConfig } from "orval"

export default defineConfig({
  flow: {
    input: "./openapi/flow.yaml",
    output: "./src/api/flow.ts",
  },
  account: {
    input: "./openapi/account.yaml",
    output: "./src/api/account.ts",
  },
})
