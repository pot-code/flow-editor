import react from "@vitejs/plugin-react-swc"
import { fileURLToPath, URL } from "node:url"
import { visualizer } from "rollup-plugin-visualizer"
import AutoImport from "unplugin-auto-import/vite"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import { defineConfig } from "vite"
import path from "node:path"

const cdn = {
  react: "https://esm.sh/react@18.2.0",
  "react-dom": "https://esm.sh/react-dom@18.2.0",
}

export default defineConfig(({ mode }) => ({
  build: {
    emptyOutDir: true,
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) return "vendor"
        },
      },
    },
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    TanStackRouterVite({
      routesDirectory: "./src/pages",
      generatedRouteTree: "./src/routes.gen.ts",
    }),
    AutoImport({
      imports: ["react"],
      dirs: ["./src/components", "./src/hooks"],
      dts: "./src/types/auto-imports.d.ts",
    }),
    mode === "analyze" &&
      visualizer({
        filename: path.join(__dirname, "dist/stats.html"),
      }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      ...(mode === "development" ? {} : cdn),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
}))
