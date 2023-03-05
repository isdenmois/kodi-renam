import { selectedSeries$ } from 'entities/series'
import { selectedFolder$ } from 'entities/folder'
import { episodes$ } from 'entities/episode'
import { isSettingsOpened$ } from 'entities/settings'
import { files$ } from 'features/rename'
import { computed } from 'nanostores'
import { FolderSelect, HomePage, LoadingPage, RenamerPage, SettingsPage } from 'pages'

type Route = 'HOME' | 'FOLDER_SELECT' | 'RENAMER' | 'LOADING' | 'SETTINGS'

export const route$ = computed(
  [selectedSeries$, selectedFolder$, files$, episodes$, isSettingsOpened$],
  (selectedSeries, selectedFolder, files, episodes, isSettingsOpened): Route => {
    if (isSettingsOpened) {
      return 'SETTINGS'
    }

    if (selectedFolder) {
      if (!files.length || !episodes.length) {
        return 'LOADING'
      }

      return 'RENAMER'
    }

    if (selectedSeries) {
      return 'FOLDER_SELECT'
    }

    return 'HOME'
  },
)

export const router: Record<Route, ConstructorOfATypedSvelteComponent> = {
  HOME: HomePage,
  FOLDER_SELECT: FolderSelect,
  RENAMER: RenamerPage,
  LOADING: LoadingPage,
  SETTINGS: SettingsPage,
}
