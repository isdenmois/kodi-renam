import { atom, computed, onSet, task } from 'nanostores'
import { folderAPI, type QFile } from 'shared/api'
import { selectedFolder$ } from 'entities/folder'

export const files$ = atom<QFile[]>([])

export const seriesFiles$ = computed(files$, files =>
  files.filter(file => file.filename && file.season > 0 && file.episode > 0).sort((a, b) => a.episode - b.episode),
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
