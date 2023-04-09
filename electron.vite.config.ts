import { resolve } from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import UnoCSS from 'unocss/vite'
import { presetUno } from 'unocss'

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin({
        exclude: ['electron-store'],
      }),
    ],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    plugins: [
      svelte(),
      UnoCSS({
        presets: [presetUno()],
      }),
    ],
    resolve: {
      alias: {
        pages: resolve(__dirname, 'src/renderer/pages'),
        features: resolve(__dirname, 'src/renderer/features'),
        entities: resolve(__dirname, 'src/renderer/entities'),
        shared: resolve(__dirname, 'src/renderer/shared'),
      },
    },
    envPrefix: 'VITE_',
    define: {
      'import.meta.env.PACKAGE_VERSION': JSON.stringify(`v${process.env.npm_package_version}`),
    },
  },
})
