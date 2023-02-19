import { z } from 'zod'

const schema = z.object({
  VITE_COUNTER_INIITAL: z.coerce.number().positive(),
  VITE_TVDB_TOKEN: z.string().min(1),
})

export const { VITE_COUNTER_INIITAL: counterInitial, VITE_TVDB_TOKEN: tvdbToken } = schema.parse(import.meta.env)
