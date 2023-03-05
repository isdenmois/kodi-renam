import { z } from 'zod'

const schema = z.object({
  VITE_TVDB_TOKEN: z.string().min(1),
  VITE_DEFAULT_PORT: z.coerce.number().min(1),
})

export const { VITE_TVDB_TOKEN: tvdbToken, VITE_DEFAULT_PORT: defaultPort } = schema.parse(import.meta.env)
