import { atom } from 'nanostores'
import { tvdbAPI } from 'shared/api'
import { selectedSeries$, series$ } from 'entities/series'
import { language$ } from 'entities/language'

export const isSearching$ = atom(false)

export const search = async (name: string) => {
  isSearching$.set(true)
  selectedSeries$.set(null)
  series$.set(null)

  const language = language$.get()

  try {
    const series = await tvdbAPI.search(name, language)

    series$.set(series)
  } catch (error) {
    console.error(error)
  }

  isSearching$.set(false)
}
