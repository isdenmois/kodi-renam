<script lang="ts">
  import { icons } from 'shared/ui'
  import { filteredFolders$, selectedFolder$ } from '../model'
  import FolderDescription from './FolderDescription.svelte'
</script>

<ul>
  {#each $filteredFolders$ as folder}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li class="list-item" on:click={() => selectedFolder$.set(folder)}>
      <img class="icon" src={icons.download} alt="download" />

      <div>
        <div class="title">{folder.name}</div>
        <FolderDescription {folder} />
      </div>
    </li>
  {/each}
</ul>

<style>
  ul {
    padding: 16px;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    flex: 1;
    list-style-type: none;
  }

  .list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    cursor: pointer;
  }

  .list-item:hover {
    background-color: #0001;
  }

  .icon {
    width: 48px;
    height: 48px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    color: #13183f;
  }
</style>
