import '@unocss/reset/normalize.css'
import 'virtual:uno.css'
import 'shared/ui'
import { setPort } from 'shared/api/folder/api'
import { setApiKey } from 'shared/api/tvdb/auth'
import { refreshFolders } from 'entities/folder'
import { loadSettings, settings$ } from 'entities/settings'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
})

loadSettings().then(() => {
  settings$.subscribe(settings => {
    setApiKey(settings.token)
    setPort(settings.port)

    refreshFolders()
  })
})

export default app
