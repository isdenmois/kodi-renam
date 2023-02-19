<script lang="ts">
  import type { QFile } from 'shared/api'
  import { formatBytes } from 'shared/lib'
  import FileIcon from './FileIcon.svelte'

  export let file: QFile
</script>

<FileIcon title={'' + file.episode} />

<div class="input-wrapper">
  <label for={file.filename}>
    <span>{file.filename}</span>
    <span>({formatBytes(file.size)})</span>
  </label>

  <input id={file.filename} type="text" placeholder={file.filename} bind:value={file.title} />
</div>

<style>
  .input-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .input-wrapper label {
    font-size: 12px;
    font-weight: bold;
  }

  .input-wrapper input {
    border: 2px solid #e9e9e9;
    padding: 8px 12px;
  }
</style>
