<script lang="ts">
  import { episodes$ } from 'entities/episode'
  import { selectedFolder$ } from 'entities/folder'
  import { selectedSeries$ } from 'entities/series'
  import { files$, toRename$, isRenaming$, renameFiles, FileToRename } from 'features/rename'

  const files = structuredClone(toRename$.get())

  const cancel = () => {
    files$.set([])
    episodes$.set([])
    selectedFolder$.set(null)
  }

  const startProcess = async () => {
    await renameFiles(files.filter(file => !file.skip))

    selectedSeries$.set(null)
    cancel()
  }
</script>

<ul>
  {#each files as file}
    <li>
      <FileToRename {file} />
    </li>
  {/each}
</ul>

<footer>
  <button on:click={cancel}>Cancel</button>
  <button class="primary" disabled={$isRenaming$} on:click={startProcess}> Rename </button>
</footer>

<style>
  ul {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    padding: 8px 16px;
    gap: 24px;
    display: flex;
    flex-direction: column;
    list-style-type: none;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
</style>
