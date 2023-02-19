import wretch from 'wretch'
import QueryAddon from 'wretch/addons/queryString'
import FormUrlAddon from 'wretch/addons/formUrl'

export const api = wretch()
  .url('http://localhost:9990/api/v2')
  .options({ cache: 'no-store' })
  .addon(QueryAddon)
  .addon(FormUrlAddon)
