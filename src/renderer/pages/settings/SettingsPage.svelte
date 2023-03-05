<script lang="ts">
  import { closeSettings, settings$, updateSettings } from 'entities/settings'
  import { Input } from 'shared/ui'

  const settings = settings$.get()

  let port = String(settings.port)
  let token = settings.token

  const save = async () => {
    if (+port > 65535) {
      port = ''
    }

    updateSettings({
      port: +port || settings.port,
      token: token || settings.token,
    })
    closeSettings()
  }
</script>

<main>
  <form on:submit|preventDefault={save}>
    <Input type="number" label="Port" bind:value={port} />

    <div class="h-4" />

    <Input label="TVDB token" bind:value={token} />

    <button class="hidden" type="submit" />
  </form>
</main>

<footer>
  <button on:click={closeSettings}>Close</button>
  <button type="submit" class="primary" on:click={save}>Save</button>
</footer>

<style>
  main {
    flex: 1;
    padding: 16px;
  }
</style>
