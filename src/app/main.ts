import '@unocss/reset/normalize.css'
import 'virtual:uno.css'
import App from './App.svelte'

const target = document.getElementById('app') as Element

const app = new App({ target: target })

export default app
