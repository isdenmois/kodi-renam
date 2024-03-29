import { z } from 'zod'

const schema = z.object({
  PROD: z.coerce.boolean(),
  PACKAGE_VERSION: z.string().transform(version => version.replaceAll('"', '')),
  VITE_TVDB_TOKEN: z.string().min(1),
  VITE_DEFAULT_PORT: z.coerce.number().min(1),
  VITE_GITHUB_REPO: z.string(),
})

export const {
  PROD: isProd,
  PACKAGE_VERSION: appVersion,
  VITE_TVDB_TOKEN: tvdbToken,
  VITE_DEFAULT_PORT: defaultPort,
  VITE_GITHUB_REPO: githubRepo,
} = schema.parse(import.meta.env)
