import wretch from 'wretch'
import QueryAddon from 'wretch/addons/queryString'
import FormUrlAddon from 'wretch/addons/formUrl'

export const api = wretch()
  .url('http://localhost:8080')
  .options({ cache: 'no-store' })
  .addon(QueryAddon)
  .addon(FormUrlAddon)
