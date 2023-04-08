import { z } from 'zod'

const schema = z.object({
  PROD: z.boolean(),
  VITE_TVDB_TOKEN: z.string().min(1),
  VITE_DEFAULT_PORT: z.coerce.number().min(1),
  VITE_GITHUB_REPO: z.string(),
})

export const {
  PROD: isProd,
  VITE_TVDB_TOKEN: tvdbToken,
  VITE_DEFAULT_PORT: defaultPort,
  VITE_GITHUB_REPO: githubRepo,
} = schema.parse(import.meta.env)
