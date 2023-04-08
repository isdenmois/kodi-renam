export const splitPath = (path: string) => {
  const slashIndex = path.lastIndexOf('/')
  const directory = slashIndex > 0 ? path.slice(0, slashIndex) : null
  const filename = path.slice(slashIndex + 1)

  return [directory, filename] as const
}
