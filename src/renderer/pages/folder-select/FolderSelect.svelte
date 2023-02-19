<script lang="ts">
  import { selectedSeries$ } from 'entities/series'
  import { Categories, FoldersList, refreshFolders } from 'entities/folder'

  const series = selectedSeries$.get()

  refreshFolders()

  const close = () => selectedSeries$.set(null)
</script>

<main>
  <div class="info">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img src={series.image} alt={series.seriesName} on:click={close} />

    <div>
      <h3>{series.seriesName}</h3>
      <p>{series.overview}</p>
    </div>
  </div>

  <Categories />
  <FoldersList />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    padding: 16px;
  }

  .info {
    display: flex;
    flex-direction: row;
    gap: 32px;
  }

  img {
    height: 150px;
    width: 100px;
    object-fit: cover;
    border-radius: 16px;
    cursor: pointer;
  }
</style>
