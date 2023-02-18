<script lang="ts">
  import { Counter } from 'entities/counter'
  import { tvdbAPI } from 'shared/api'
  import type { SearchItem, Episode } from 'shared/api'

  let query = ''
  let search: SearchItem[] = []

  const searchSeries = async () => {
    if (query) {
      search = await tvdbAPI.search(query)
    } else {
      search = []
    }
  }

  let episodeId = 0
  let season = 1
  let episodes: Episode[] = []
  const fetchEpisodes = async () => {
    if (episodeId && season) {
      episodes = await tvdbAPI.episodes(episodeId, season)
    } else {
      episodes = []
    }
  }
</script>

<main class="text-center">
  <h1>KodiRenam</h1>

  <Counter />

  <form on:submit|preventDefault={searchSeries}>
    <input type="text" bind:value={query} placeholder="query" />

    {#if search.length > 0}
      <code>
        {JSON.stringify(search, null, 2)}
      </code>
    {/if}
  </form>

  <form on:submit|preventDefault={fetchEpisodes}>
    <input type="number" bind:value={episodeId} placeholder="Episode ID" />
    <input type="number" bind:value={season} placeholder="season" />
    <input type="submit" value="Fetch" />

    {#if episodes.length > 0}
      <code>
        {JSON.stringify(episodes, null, 2)}
      </code>
    {/if}
  </form>
</main>
