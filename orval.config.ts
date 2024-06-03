import { defineConfig } from "orval"

export default defineConfig({
  flow: {
    input: {
      target: "http://127.0.0.1:3000/swagger/doc.json",
      filters: {
        tags: ["flow"],
      },
    },
    output: {
      target: "./src/api/flow.ts",
      override: {
        mutator: {
          path: "src/lib/http/instance.ts",
          name: "customInstance",
        },
      },
    },
  },
  account: {
    input: {
      target: "http://127.0.0.1:3000/swagger/doc.json",
      filters: {
        tags: ["account"],
      },
    },
    output: {
      target: "./src/api/account.ts",
      override: {
        mutator: {
          path: "src/lib/http/instance.ts",
          name: "customInstance",
        },
      },
    },
  },
})
