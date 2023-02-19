<script>
  import { count$, increment, decrement } from '../model'
</script>

<div>
  <button on:click={decrement}>--</button>
  <span>{$count$}</span>
  <button on:click={increment}>++</button>
</div>
