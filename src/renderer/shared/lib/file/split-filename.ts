export const splitFilename = (filename: string) => {
  const dotIndex = filename.lastIndexOf('.')

  if (dotIndex <= 0) {
    return [filename, '']
  }

  return [filename.slice(0, dotIndex), filename.slice(dotIndex + 1)]
}
