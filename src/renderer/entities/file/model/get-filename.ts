import { splitFilename } from './split-filename'

const NON_VALID_CHARACTERS = /[<>:"/\\|?*\u0000-\u001F]/g // eslint-disable-line no-control-regex
const MAX_FILENAME_LENGTH = 100

export const getFileName = (title: string) => {
  const filename = title.replaceAll('/', '-').replaceAll(NON_VALID_CHARACTERS, '')

  if (filename.length > MAX_FILENAME_LENGTH) {
    const [basename, ext] = splitFilename(filename)

    return `${basename.slice(0, MAX_FILENAME_LENGTH)}.${ext}`
  }

  return filename
}
