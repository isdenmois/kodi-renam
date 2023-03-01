import { z } from 'zod'
import { api } from './api'

const BANNER_PREFIX = 'https://artworks.thetvdb.com/banners'

const episodeSchema = z.object({
  id: z.coerce.number(),
  episodeName: z
    .string()
    .nullish()
    .transform(episodeName => episodeName || 'Untitled episode'),
  filename: z.string().transform(filename => (filename ? `${BANNER_PREFIX}/${filename}` : null)),
  siteRating: z.number().optional(),
  airedEpisodeNumber: z.number(),
})

export type Episode = z.infer<typeof episodeSchema>

const episodesSchema = z.array(episodeSchema)

export const episodes = (id: number, airedSeason: number) =>
  api
    .query({ airedSeason })
    .get(`series/${id}/episodes/query`)
    .then((data: unknown) => episodesSchema.parse(data))
