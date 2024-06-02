import { defineConfig } from "orval"

export default defineConfig({
  flow: {
    input: "./openapi/flow.json",
    output: "./src/api/flow.ts",
  },
  account: {
    input: "./openapi/account.json",
    output: "./src/api/account.ts",
  },
})
