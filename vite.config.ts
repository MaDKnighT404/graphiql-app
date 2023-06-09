/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { configDefaults } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths(), visualizer() as PluginOption],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  test: {
    coverage: {
      exclude: [
        ...configDefaults.coverage.exclude,
        'src/shared/types',
        'src/main.tsx',
        'src/__test__/__mocks__',
      ],
      all: true,
      src: ['src'],
      provider: 'c8',
      reporter: ['text'],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__test__/setup.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: false,
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
});
