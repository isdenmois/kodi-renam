import { api } from './api'

export const rename = (hash: string, oldPath: string, newPath: string): Promise<unknown> =>
  api.url('/api/v2/torrents/renameFile').formUrl({ hash, oldPath, newPath }).post().text()
