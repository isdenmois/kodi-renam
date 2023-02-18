import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [svelte()],
    test: {
      environment: 'jsdom',
      css: false,
      setupFiles: ['./src/shared/tests/setup.ts'],
      include: ['src/**/*.test.ts'],
    },
    resolve: {
      alias: {
        pages: resolve(__dirname, 'src/pages'),
        features: resolve(__dirname, 'src/features'),
        entities: resolve(__dirname, 'src/entities'),
        shared: resolve(__dirname, 'src/shared'),
      },
    },
  }
})
