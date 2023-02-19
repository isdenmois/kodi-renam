import { atom, computed } from 'nanostores'
import type { Episode } from 'shared/api'

export const episodes$ = atom<Episode[]>([])

export const episodeMap$ = computed(
  episodes$,
  episodes => new Map(episodes.map(episode => [episode.airedEpisodeNumber, episode])),
)
