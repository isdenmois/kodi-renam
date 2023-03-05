<script lang="ts">
  import type { SearchItem } from 'shared/api'
  import { series$, selectedSeries$, SeriesCard } from 'entities/series'
  import { isSearching$, search } from 'features/series-search'
  import { openSettings } from 'entities/settings'
  import { language$ } from 'entities/language'

  let query = ''

  let languageSelect: HTMLSelectElement

  const handleLanguageSelect = () => language$.set(languageSelect.value)

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

    <select bind:this={languageSelect} value={$language$} on:change={handleLanguageSelect}>
      <option value="" disabled>Language</option>
      <option value="en">English</option>
      <option value="ru">Русский</option>
    </select>
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
  {:else}
    <footer>
      <button on:click={openSettings}>Settings</button>
    </footer>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
  input {
    width: 50vw;
  }
  form {
    align-self: center;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 16px;
  }
  ul {
    flex: 100;
    overflow: auto;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px;
    gap: 16px;
  }
</style>
