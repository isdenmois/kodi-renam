/// <reference types="svelte" />
/// <reference types="vite/client" />
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI

    APP_VERSION: string
  }
}
