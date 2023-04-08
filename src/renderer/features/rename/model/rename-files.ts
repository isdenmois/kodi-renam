import { atom } from 'nanostores'

import { folderAPI, type QFile } from 'shared/api'
import { getFileDestination } from 'entities/file'
import { selectedFolder$ } from 'entities/folder'
import { selectedSeries$ } from 'entities/series'

export const isRenaming$ = atom(false)

export const renameFiles = async (files: QFile[]) => {
  const { seriesName } = selectedSeries$.get()
  const hash = selectedFolder$.get().hash

  isRenaming$.set(true)

  for (const file of files) {
    const from = `${file.directory}/${file.filename}`
    const to = getFileDestination(file, seriesName)

    if (from !== to) {
      await folderAPI.rename(hash, from, to)
    }
  }

  isRenaming$.set(false)
}
