import { atom } from 'nanostores'
import { tvdbAPI } from 'shared/api'
import { selectedSeries$, series$ } from 'entities/series'

export const isSearching$ = atom(false)

export const search = async (name: string) => {
  isSearching$.set(true)
  selectedSeries$.set(null)
  series$.set(null)

  try {
    const series = await tvdbAPI.search(name)

    series$.set(series)
  } catch (error) {
    console.error(error)
  }

  isSearching$.set(false)
}
