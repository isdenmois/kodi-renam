<script lang="ts">
  import { route$, router } from './routing'
</script>

<svelte:component this={router[$route$]} />
