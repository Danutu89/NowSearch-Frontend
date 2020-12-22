<script>
  import { onMount } from "svelte";
  import { search } from "../actions/index";
  import { dispatch } from "$utils/index";

  export let minimal, searchQuery, mobile;

  let SearchBar;

  let params;

  const submitSearch = (query) => {
    minimal = true;
    dispatch(() => search(query, "home"));
  };

  onMount(async () => {
    const module = await import("$components/SearchBar.svelte");
    SearchBar = module.default;

    if (searchQuery) dispatch(() => search(searchQuery, "home"));
  });
</script>

<style lang="scss">
  @import "../../static/global.scss";
  navbar {
    width: 600px;
    display: block;
    text-align: center;
    position: relative;
    margin: auto;
    z-index: 2;
    transition: all 0.5s cubic-bezier(0.46, 0.03, 0.52, 0.96);
    &.minimal {
      display: flex;
      max-height: 60px;
      padding: 0.5rem 0rem;
      background: $background-darker;
      width: initial;
      top: 0;
      position: sticky;

      @media screen and (max-width: 1024px) {
        width: auto;
        margin: auto;
      }
    }

    @media screen and (max-width: 700px) {
      width: calc(100% - 4rem);
      margin: 2rem;
    }
  }

  h1 {
    color: $primary-color;
    font-size: 3rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 4rem auto;

    &.minimal {
      margin: auto 1rem;
      font-size: 1.5rem;
      width: 7rem;

      @media screen and (max-width: 1024px) {
        width: auto;
        margin: auto 0.2rem auto 1rem;
      }
    }
  }

  p {
    margin: 2rem auto;
    line-height: 1.35;
  }

  h1 {
    max-width: none;
  }

  p {
    max-width: none;
  }
</style>

<navbar class:minimal>
  <h1 class:minimal>{`${mobile && minimal ? 'N' : 'NewApp'}`}</h1>
  <svelte:component this={SearchBar} onSearch={submitSearch} {minimal} />
</navbar>
