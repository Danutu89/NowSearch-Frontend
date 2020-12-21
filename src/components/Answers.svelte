<script>
  export let data;
  import Answer from "./Answer.svelte";
</script>

{#if data.length > 1}
  <answers>
    {#each data as answer}
      <Answer data={answer} />
    {/each}
  </answers>
{:else}
  <Answer data={data[0]} />
{/if}
