<script lang="ts">
  import { tvdbAPI } from 'shared/api'
  import type { Episode } from 'shared/api'
  import { HomePage } from 'pages/home'

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

<HomePage />

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
