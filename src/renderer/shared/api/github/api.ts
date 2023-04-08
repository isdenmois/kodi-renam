import wretch from 'wretch'
import QueryAddon from 'wretch/addons/queryString'
import { env, logMiddleware } from 'shared/lib'

export const api = wretch(`https://api.github.com/repos/${env.githubRepo}`)
  .addon(QueryAddon)
  .middlewares([logMiddleware])
  .headers({ 'X-GitHub-Api-Version': '2022-11-28' })
