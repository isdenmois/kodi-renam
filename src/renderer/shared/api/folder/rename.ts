import { api } from './api'

export const rename = (hash: string, oldPath: string, newPath: string): Promise<unknown> =>
  api.url('/torrents/renameFile').formUrl({ hash, oldPath, newPath }).post().text()
