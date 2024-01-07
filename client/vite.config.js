import { defineConfig, normalizePath  } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
    return {
        base: '/',
        plugins: [
            react({
                jsxImportSource: '@emotion/react',
                babel: {
                  plugins: ['@emotion/babel-plugin'],
                },
            }),
            viteTsconfigPaths()
        ],
        build: {
            outDir: 'build',
            assetsDir: 'assets',
            emptyOutDir: true
        },
        resolve: {
            alias: {
                '@': normalizePath(path.resolve(__dirname, './src')),
            },
        },
        server: {
            open: true,
            port: 8080
        },
        preview: {
            open: true,
            port: 8080,
        },
    };
});
