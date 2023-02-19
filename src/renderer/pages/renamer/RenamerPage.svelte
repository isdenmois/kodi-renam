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
    await renameFiles(files)

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

<div class="footer">
  <button on:click={cancel}>Cancel</button>
  <button class="active" disabled={$isRenaming$} on:click={startProcess}> Rename </button>
</div>

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

  .footer {
    border-top: 1px solid #f6f6f6;
    padding: 16px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 16px;
  }

  .footer button {
    all: unset;
    cursor: pointer;
    font-size: 18px;
    color: #424554;
    padding: 12px 32px;
    border-radius: 8px;
  }

  .footer button:hover {
    background-color: #f0f1f7;
  }

  .footer button.active {
    background-color: #549cf8;
    color: white;
  }

  .footer button.active:hover {
    background-color: #80b6fa;
  }

  .footer button:disabled {
    opacity: 0.5;
  }
</style>
