import { z } from 'zod'

const schema = z.object({
  VITE_COUNTER_INIITAL: z.coerce.number().positive(),
})

export const { VITE_COUNTER_INIITAL: counterInitial } = schema.parse(import.meta.env)
