<script lang="ts">
  import type { QFile } from 'shared/api'
  import { formatBytes } from 'shared/lib'
  import FileIcon from './FileIcon.svelte'

  export let file: QFile

  const toggleSkip = () => {
    file.skip = !file.skip
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="icon" class:skip={file.skip} on:click={toggleSkip}>
  <FileIcon title={'' + file.episode} />

  <div class="skip-toggle">
    <FileIcon title="Skip" />
  </div>
</div>

<div class="input-wrapper" class:skip={file.skip}>
  <label for={file.filename}>
    <span>{file.filename}</span>
    <span>({formatBytes(file.size)})</span>
  </label>

  <input id={file.filename} disabled={file.skip} type="text" placeholder={file.filename} bind:value={file.title} />
</div>

<style>
  .icon {
    cursor: pointer;
    position: relative;
  }
  .skip-toggle {
    position: absolute;
    inset: 0;
    opacity: 0;
  }

  .icon:hover .skip-toggle {
    opacity: 1;
  }

  .input-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .skip {
    opacity: 0.3;
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
