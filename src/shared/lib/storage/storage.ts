import { ipcRenderer } from 'electron'

export const get = <T>(key: string) => ipcRenderer.invoke('storage/get', key) as Promise<T>

export const set = <T>(key: string, value: T) => ipcRenderer.invoke('storage/set', key, value) as Promise<void>
