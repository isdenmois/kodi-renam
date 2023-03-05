<script lang="ts">
  export let type = 'text'
  export let label = ''
  export let placeholder = ''
  export let value = ''

  let inputRef: HTMLInputElement

  const handleInput = () => {
    value = inputRef.value
  }
</script>

<div class="input-wrapper">
  {#if label}
    <label for={label}>
      {label}
    </label>
  {/if}

  <input id={label} {type} {placeholder} {value} bind:this={inputRef} on:input={handleInput} />
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
