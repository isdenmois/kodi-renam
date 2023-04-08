import wretch from 'wretch'
import QueryAddon from 'wretch/addons/queryString'
import { logMiddleware } from 'shared/lib'
import { authMiddleware } from './auth'

const parseResponse = (response: unknown) => {
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data
  }

  return response
}

export const api = wretch('https://api.thetvdb.com/')
  .addon(QueryAddon)
  .middlewares([authMiddleware, logMiddleware])
  .resolve(r => r.json().then(parseResponse))
