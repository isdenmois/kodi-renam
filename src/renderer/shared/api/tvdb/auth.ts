import wretch from 'wretch'
import type { FetchLike } from 'wretch'
import jwt from 'jwt-decode'
import type { JwtPayload } from 'jwt-decode'
import { env, storage } from 'shared/lib'

const getToken = async (): Promise<string | null> => {
  const token = await storage.get<string>('token')

  if (token) {
    const expiration = token ? jwt<JwtPayload>(token).exp ?? 0 : 0

    if (expiration > Date.now() / 1000 + 1) {
      return token
    }
  }

  return null
}

const setToken = async (token: string): Promise<void> => {
  storage.set('token', token)
}

const login = () =>
  wretch('https://api.thetvdb.com/login')
    .json({ apikey: env.tvdbToken })
    .post()
    .res(response => response.json())
    .then(({ token }) => <string>token)

export const authMiddleware =
  (next: FetchLike): FetchLike =>
  async (url, options) => {
    let token = await getToken()

    if (!token) {
      token = await login()

      setToken(token)
    }

    return next(url, {
      ...options,
      headers: {
        ...(options.headers ?? {}),
        Authorization: `Bearer ${token}`,
      },
    })
  }
