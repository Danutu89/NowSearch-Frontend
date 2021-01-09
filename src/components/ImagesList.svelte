<script>
  import ImageCard from "./ImageCard.svelte";
  import ImagePreview from "./ImagePreview.svelte";
  import { search as searchStore } from "../stores/index";
  import { images as imagesState } from "$stores/index";
  import { styles } from "$utils/index";
  import { onMount } from "svelte";

  let searchState, mobile;
  const unsubscribe = searchStore.subscribe((value) => {
    searchState = value;
  });

  onMount(() => {
    mobile = window.screen.width < 700;
  });
</script>

<style lang="scss">
  container {
    display: flex;
    overflow-x: hidden;

    list {
      padding: 1em;
      position: relative;
      margin-bottom: 2rem;
      width: calc(var(--width) - 2.6rem);
      margin: 0;
      display: flex;
      flex-flow: wrap;
      transition: all 0.2s linear;

      @media only screen and (max-width: 700px) {
        width: 100%;
        display: block;
      }
    }

    @media only screen and (max-width: 700px) {
      width: 100%;
    }
  }
</style>

<container>
  <list
    use:styles={{ width: `${$imagesState.selected ? 'calc(100% - 400px)' : '100%'}` }}>
    {#if searchState.loading === false && searchState.data}
      {#each searchState.data.results as result}
        <ImageCard {mobile} {result} loading={false} />
      {/each}
    {:else if searchState.loading === true}
      {#each Array(5) as x}
        <ImageCard result={{}} loading={true} />
      {/each}
    {/if}
  </list>

  <ImagePreview />
</container>
