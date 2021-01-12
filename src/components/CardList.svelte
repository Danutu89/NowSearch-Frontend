<script>
  import Card from "./Card.svelte";
  import { search as searchStore } from "$stores/index";

  let searchState;
  const unsubscribe = searchStore.subscribe((value) => {
    searchState = value;
  });
</script>

<style lang="scss">
  list {
    display: grid;
    grid-gap: 1rem;
    margin-bottom: 2rem;
    width: 700px;

    @media screen and (max-width: 1024px) {
      width: 100%;
    }
  }
</style>

<list>
  {#if searchState.loading === false && searchState.data}
    {#each searchState.data.results as result}
      <Card {result} loading={false} />
    {/each}
    {#if searchState.loadingMore === true}
      {#each Array(5) as x}
        <Card result={{}} loading={true} />
      {/each}
    {/if}
  {:else if searchState.loading === true}
    {#each Array(5) as x}
      <Card result={{}} loading={true} />
    {/each}
  {/if}
</list>
