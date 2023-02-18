import { search } from './search'
import { episodes } from './episodes'

export type { SearchItem } from './search'
export type { Episode } from './episodes'

export const tvdbAPI = { search, episodes }
