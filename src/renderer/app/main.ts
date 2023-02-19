import '@unocss/reset/normalize.css'
import 'virtual:uno.css'
import 'shared/ui/global.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
})

export default app
