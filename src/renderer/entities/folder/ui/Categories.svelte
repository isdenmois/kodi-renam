<script lang="ts">
  import { categories$, selectedCategory$ } from '../model'

  const select = (category: string) => {
    if (selectedCategory$.get() === category) {
      selectedCategory$.set(null)
    } else {
      selectedCategory$.set(category)
    }
  }
</script>

<ul>
  {#each $categories$ as category}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li class="item" class:selected={$selectedCategory$ === category} on:click={() => select(category)}>
      {category}
    </li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overscroll-behavior: contain;
    gap: 16px;
    padding: 8px 16px;
    flex-wrap: wrap;
    list-style-type: none;
  }

  li {
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 20px;
    border: 1px solid #e0e0e0;
    color: #787d87;
    cursor: pointer;
  }

  .selected {
    background-color: #b8d5f9;
    border-color: #5396ee;
    color: #092d5d;
  }
</style>
