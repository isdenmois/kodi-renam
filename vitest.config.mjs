import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [svelte()],
  test: {
    environment: 'jsdom',
    css: false,
    setupFiles: ['./src/tests/setup.ts'],
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      pages: resolve(__dirname, 'src/renderer/pages'),
      features: resolve(__dirname, 'src/renderer/features'),
      entities: resolve(__dirname, 'src/renderer/entities'),
      shared: resolve(__dirname, 'src/renderer/shared'),
    },
  },
}))
