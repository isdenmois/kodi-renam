<script lang="ts">
  import type { SearchItem } from 'shared/api'

  export let series: SearchItem
</script>

<div class="series-card">
  <img src={series.image} alt={series.overview} title={series.overview} loading="lazy" />

  <div class="info">
    <h3>{series.seriesName}</h3>

    {#if series.firstAired || series.network}
      <h5>
        {#if series.firstAired}
          <span>{series.firstAired.getFullYear()}</span>
        {/if}{#if series.network}
          <span>{series.network}</span>
        {/if}
      </h5>
    {/if}
  </div>
</div>

<style>
  .series-card {
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }

  .info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0px -8px 16px 16px #000a;
    background-color: #000a;
    color: white;
    padding: 0 16px 16px;
  }

  img {
    height: 300px;
    width: 200px;
    object-fit: cover;
  }

  h3,
  h5 {
    margin: 0;
  }
</style>
