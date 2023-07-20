import react from "@vitejs/plugin-react-swc"
import path from "node:path"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@/",
        replacement: `${path.resolve(__dirname, "src")}/`,
      },
      {
        find: /^shared(.*)/,
        replacement: path.resolve(__dirname, "../shared/src") + "$1",
      },
    ],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
})
