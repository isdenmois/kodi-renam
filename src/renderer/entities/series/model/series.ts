import { atom } from 'nanostores'
import type { SearchItem, Episode } from 'shared/api'

export const series$ = atom<SearchItem[] | null>(null)

export const selectedSeries$ = atom<SearchItem | null>(null)

export const episodes$ = atom<Episode[] | null>(null)
