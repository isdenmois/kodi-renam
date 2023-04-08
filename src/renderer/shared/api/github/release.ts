import { z } from 'zod'
import { api } from './api'

const releaseSchema = z.object({
  id: z.number(),
  tag_name: z.string(),
  html_url: z.string().url(),
  created_at: z.coerce.date(),
})

export type Release = z.infer<typeof releaseSchema>

export const latestRelease = () =>
  api
    .get('/releases/latest')
    .json()
    .then((data: unknown) => releaseSchema.parse(data))
