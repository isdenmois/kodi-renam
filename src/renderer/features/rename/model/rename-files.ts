import { atom } from 'nanostores'

import { folderAPI, type QFile } from 'shared/api'
import { selectedFolder$ } from 'entities/folder'
import { selectedSeries$ } from 'entities/series'

export const isRenaming$ = atom(false)
const IS_MOVIE = /\.(mkv|mp4|avi|webm|flv|mov|m4v|mpg|mpeg|mov)$/i

const getFileDestination = (file: QFile, seriesName: string) => {
  const title = file.title.replaceAll('/', '-')

  if (file.filename.match(IS_MOVIE)) {
    return `${seriesName}/Season ${file.season}/${title}`
  }

  return `${file.directory}/${title}`
}

export const renameFiles = async (files: QFile[]) => {
  const { seriesName } = selectedSeries$.get()
  const hash = selectedFolder$.get().hash

  isRenaming$.set(true)

  for (const file of files) {
    if (file.title && file.title !== file.filename) {
      const from = `${file.directory}/${file.filename}`
      const to = getFileDestination(file, seriesName)

      await folderAPI.rename(hash, from, to)
    }
  }

  isRenaming$.set(false)
}
