import { tvdbAPI } from 'shared/api'
import { selectedSeries$ } from 'entities/series'
import { episodes$ } from 'entities/episode'
import { language$ } from 'entities/language'
import { season$ } from './files'

season$.subscribe(async season => {
  const selectedSeries = selectedSeries$.get()
  const language = language$.get()

  if (season > 0 && selectedSeries) {
    tvdbAPI.episodes(selectedSeries.id, season, language).then(episodes => {
      episodes$.set(episodes)
    })
  } else {
    episodes$.set([])
  }
})
