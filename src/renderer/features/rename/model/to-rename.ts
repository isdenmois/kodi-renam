import { episodeMap$ } from 'entities/episode'
import { computed } from 'nanostores'
import { seriesFiles$ } from './files'

const REPLACE_WITH_DOT_REGEX = /[:]/g
const REMOVE_REGEX = /[#"]/g

export const toRename$ = computed([episodeMap$, seriesFiles$], (episodeMap, seriesFiles) => {
  return seriesFiles.map(file => {
    const episode = episodeMap.get(file.episode)

    const s = String(file.season).padStart(2, '0')
    const ep = String(file.episode).padStart(2, '0')
    const ext = file.filename.slice(file.filename.lastIndexOf('.') + 1)
    const title = episode.episodeName.replace(REPLACE_WITH_DOT_REGEX, '.').replace(REMOVE_REGEX, '')

    return { ...file, title: `S${s}E${ep}. ${title}.${ext}` }
  })
})
