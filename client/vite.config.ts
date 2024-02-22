import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const backUrl = "https://54.180.114.71";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: backUrl,
        changeOrigin: true,
      },
    },
  },
});
