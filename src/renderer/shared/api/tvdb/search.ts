import { z } from 'zod'
import { api } from './api'

const searchItemSchema = z.object({
  id: z.coerce.number(),
  image: z.string().optional(),
  seriesName: z.string(),
  overview: z.string().optional(),
  firstAired: z
    .string()
    .optional()
    .transform(date => (date ? new Date(date) : null)),
})

export type SearchItem = z.infer<typeof searchItemSchema>

const searchSchema = z.array(searchItemSchema)

export const search = (name: string) =>
  api
    .query({ name })
    .get('search/series')
    .then((data: unknown) => searchSchema.parse(data))
