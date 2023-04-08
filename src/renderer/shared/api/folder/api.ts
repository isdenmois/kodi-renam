import wretch, { type FetchLike } from 'wretch'
import QueryAddon from 'wretch/addons/queryString'
import FormUrlAddon from 'wretch/addons/formUrl'
import { env, logMiddleware } from 'shared/lib'

let port = env.defaultPort

export const setPort = (newPort: number) => {
  port = newPort
}

const portMiddleware =
  (next: FetchLike): FetchLike =>
  async (url, options) => {
    return next(url.replace('{{port}}', String(port)), options)
  }

export const api = wretch()
  .url('http://localhost:{{port}}/api/v2')
  .options({ cache: 'no-store' })
  .middlewares([portMiddleware, logMiddleware])
  .addon(QueryAddon)
  .addon(FormUrlAddon)
