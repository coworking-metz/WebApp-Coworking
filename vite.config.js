import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version)
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
