import { z } from 'zod'
import { api } from './api'

const REG_EXP = [/S(\d+)E(\d+)/i, /^()(\d+)\./i, /S(\d+).*[E/](\d+)/i]

const parseSeasonEndEpisode = (filename: string) => {
  for (const regexp of REG_EXP) {
    const [, season, episode] = filename.match(regexp) || []

    if (season && episode) {
      return { season, episode }
    }
  }

  return null
}

const fileSchema = z
  .object({
    name: z.string(),
    size: z.number(),
  })
  .transform(file => {
    const slashIndex = file.name.lastIndexOf('/')
    const directory = slashIndex > 0 ? file.name.slice(0, slashIndex) : null
    const filename = file.name.slice(slashIndex + 1)
    const { season, episode } = parseSeasonEndEpisode(filename) || parseSeasonEndEpisode(file.name) || {}

    return {
      directory,
      filename,
      size: file.size,
      episode: +episode || -1,
      season: +season || -1,
      title: filename,
    }
  })

export type QFile = z.infer<typeof fileSchema>

const filesSchema = z.array(fileSchema)

export const files = async (hash: string): Promise<QFile[]> =>
  api
    .query({ hash })
    .get('/torrents/files')
    .json()
    .then((data: unknown) => filesSchema.parse(data))
