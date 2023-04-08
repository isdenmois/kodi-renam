import type { QFile } from 'shared/api'
import { getFileName } from './get-filename'

const IS_MOVIE = /\.(mkv|mp4|avi|webm|flv|mov|m4v|mpg|mpeg|mov)$/i

export const getFileDestination = (file: QFile, seriesName: string) => {
  const filename = getFileName(file.title)

  if (file.filename.match(IS_MOVIE)) {
    return `${seriesName}/Season ${file.season}/${filename}`
  }

  return `${file.directory}/${filename}`
}
