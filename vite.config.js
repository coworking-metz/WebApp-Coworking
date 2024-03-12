import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { dirname, resolve } from 'path';
import { version } from './package.json';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get the last commit's hash
const lastCommitHash = execSync('git rev-parse HEAD').toString().trim();

// https://vitejs.dev/config/
export default defineConfig({
    envDir: resolve(dirname(fileURLToPath(import.meta.url)), './src/config'),
    plugins: [vue()],
    define: {
        __APP_VERSION__: JSON.stringify(version),
        __GIT_HASH__: JSON.stringify(lastCommitHash.substring(0, 5)),
    },
    resolve: {
        alias: {
            '@': resolve(dirname(fileURLToPath(import.meta.url)), './src'),
        },
    },
});
