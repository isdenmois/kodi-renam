<script lang="ts">
  import { formatBytes, formatDate } from 'shared/lib'
  import type { Folder } from 'shared/api'

  export let folder: Folder
</script>

<div class="description">{formatBytes(folder.size)} | {formatDate(folder.completion_on)} | {folder.save_path}</div>

<style>
  .description {
    font-size: 14px;
    color: #2e3149;
  }
</style>
