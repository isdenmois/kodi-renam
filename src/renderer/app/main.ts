import '@unocss/reset/normalize.css'
import 'shared/ui'
import 'virtual:uno.css'
import { refreshFolders } from 'entities/folder'
import { loadSettings, settings$ } from 'entities/settings'
import { checkForUpdate } from 'features/update'
import { setPort } from 'shared/api/folder/api'
import { setApiKey } from 'shared/api/tvdb/auth'
import { env } from 'shared/lib'
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

if (env.isProd) {
  checkForUpdate()
}

export default app
