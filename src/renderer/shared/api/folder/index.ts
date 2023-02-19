import { files } from './files'
import { list } from './list'
import { rename } from './rename'

export type { QFile } from './files'
export type { Folder } from './list'

export const folderAPI = { files, list, rename }

globalThis.folderAPI = folderAPI
