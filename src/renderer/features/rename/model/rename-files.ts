import { atom } from 'nanostores'

import { folderAPI, type QFile } from 'shared/api'
import { selectedFolder$ } from 'entities/folder'
import { selectedSeries$ } from 'entities/series'
import { season$ } from './files'

export const isRenaming$ = atom(false)
const IS_MOVIE = /\.(mkv|mp4|avi|webm|flv|mov|m4v|mpg|mpeg|mov)$/i

export const renameFiles = async (files: QFile[]) => {
  const { seriesName } = selectedSeries$.get()
  const hash = selectedFolder$.get().hash
  const season = season$.get()
  const kodiFolder = `${seriesName}/Season ${season}`

  isRenaming$.set(true)

  for (const file of files) {
    if (file.title && file.title !== file.filename) {
      const prefix = file.filename.match(IS_MOVIE) ? kodiFolder : file.directory

      await folderAPI.rename(hash, `${file.directory}/${file.filename}`, `${prefix}/${file.title}`)
    }
  }

  isRenaming$.set(false)
}
