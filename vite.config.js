import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import pkg from './package.json';
import { execSync } from 'child_process';

// Get the last commit's hash
const lastCommitHash = execSync('git rev-parse HEAD').toString().trim();
console.log(lastCommitHash);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __GIT_HASH__: JSON.stringify(lastCommitHash.substring(0, 5))
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
