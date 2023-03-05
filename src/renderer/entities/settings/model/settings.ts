import { atom } from 'nanostores'
import { env, storage } from 'shared/lib'
import { z } from 'zod'

const settingsSchema = z.object({
  port: z.coerce.number().min(1).max(65535),
  token: z.string(),
  category: z.string().optional().nullable(),
})

type Settings = z.infer<typeof settingsSchema>

const areSettingsValid = (value: unknown): value is Settings => settingsSchema.safeParse(value).success

export const settings$ = atom<Settings>({
  port: env.defaultPort,
  token: env.tvdbToken,
})

export const updateSettings = (settings: Settings) => {
  settings$.set(settings)
  storage.set('settings', settings)
}

export const loadSettings = async () => {
  const settings = await storage.get('settings')

  if (areSettingsValid(settings)) {
    settings$.set(settings)
  }
}
