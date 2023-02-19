import { z } from 'zod'
import { sortBy } from 'shared/lib'
import { api } from './api'

const folderSchema = z.object({
  hash: z.string(),
  name: z.string(),
  save_path: z.string().transform(path => (path.endsWith('\\') ? path.slice(0, -1) : path)),
  size: z.number(),
  completion_on: z.number(),
})

export type Folder = z.infer<typeof folderSchema>

const foldersSchema = z.array(folderSchema)

export const list = async (): Promise<Folder[]> => {
  const list = await api.url('/api/v2/torrents/info').get().json()

  const folders = foldersSchema.parse(list)

  return sortBy(folders, 'name')
}
