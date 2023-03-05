import { atom, computed } from 'nanostores'
import { folderAPI, type Folder } from 'shared/api'

export const folders$ = atom<Folder[]>([])

export const categories$ = computed(folders$, folders => [...new Set(folders.map(t => t.save_path))].sort())

export const selectedCategory$ = atom<string | null>(null)

export const selectedFolder$ = atom<Folder | null>(null)

export const filteredFolders$ = computed([folders$, selectedCategory$], (folders, selectedCategory) => {
  if (selectedCategory) {
    return folders.filter(folder => folder.save_path === selectedCategory)
  }

  return folders
})

export const refreshFolders = async () => {
  const folders = await folderAPI.list()

  folders$.set(folders)
}
