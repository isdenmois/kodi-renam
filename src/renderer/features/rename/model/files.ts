import { atom, computed, onSet, task } from 'nanostores'
import { folderAPI, type QFile } from 'shared/api'
import { selectedFolder$ } from 'entities/folder'

const isSeries = /\.(mkv|mp4|avi|webm|flv|mov|m4v|mpg|mpeg|mov|srt|sub|vtt|ass|ssa)$/

export const files$ = atom<QFile[]>([])

export const seriesFiles$ = computed(files$, files =>
  files
    .filter(file => file.filename && file.season > 0 && file.episode > 0)
    .filter(file => isSeries.test(file.filename))
    .sort((a, b) => a.episode - b.episode),
)

export const season$ = computed(seriesFiles$, seriesFiles => seriesFiles[0]?.season || 0)

onSet(selectedFolder$, ({ newValue }) => {
  files$.set([])

  if (newValue) {
    task(async () => {
      files$.set(await folderAPI.files(newValue.hash))
    })
  }
})
