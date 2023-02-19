<script lang="ts">
  import type { SearchItem } from 'shared/api'
  import { series$, selectedSeries$, SeriesCard } from 'entities/series'
  import { isSearching$, search } from 'features/series-search'

  let query = ''

  const searchSeries = async () => {
    search(query)
  }

  const selectSeries = (series: SearchItem) => {
    selectedSeries$.set(series)
  }
</script>

<main>
  <form on:submit|preventDefault={searchSeries}>
    <input type="text" bind:value={query} placeholder="Search a series" />
  </form>

  {#if $isSearching$}
    <div>Searching...</div>
  {/if}

  {#if $series$?.length}
    <ul>
      {#each $series$ as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => selectSeries(item)}>
          <SeriesCard series={item} />
        </li>
      {/each}
    </ul>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 16px;
    overflow: hidden;
  }
  input {
    width: 50vw;
  }
  form {
    align-self: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  ul {
    flex: 100;
    overflow: auto;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
  }
</style>
