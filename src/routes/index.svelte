<script>
  import { onMount } from "svelte";
  import { main as mainState } from "$stores/index";
  import { catcher } from "$utils/index";
  import Navbar from "$components/Navbar.svelte";
  import InfoBox from "$components/InfoBox.svelte";
  import Suggestions from "$components/Suggestions.svelte";
  import Corrections from "$components/Corrections.svelte";
  import Answers from "$components/Answers.svelte";
  import { searchReducer } from "$reducers/index";
  import { searchInterceptor } from "$interceptors/index";
  import { search as searchState } from "$stores/index";
  import { addReducerAndInterceptors } from "$utils/index";

  let CardList,
    searchQuery,
    params,
    minimal,
    infobox,
    loading,
    suggestions,
    corrections,
    answers,
    mobile,
    error;

  onMount(async () => {
    addReducerAndInterceptors(
      searchInterceptor,
      searchReducer,
      "home",
      searchState
    );

    const module = await import("$components/CardList.svelte");
    CardList = module.default;

    params = new URLSearchParams(window.location.search);
    searchQuery = params.get("q");

    mobile = window.screen.width < 700;

    const unsubscribe = searchState.subscribe((value) => {
      minimal = value.searched;
      loading = value.loading;
      error = value.error;
      if (value.loading == false && value.searched) {
        infobox = value.data.infoboxes ? value.data.infoboxes[0] : null;
        suggestions = value.data.suggestions;
        answers = value.data.answers;
        corrections = value.data.corrections;
      }
    });

    const m_unsubscribe = mainState.subscribe((value) => {
      console.log(value);
      catcher(value);
    });
  });
</script>

<style lang="scss">
  @import "../../static/global.scss";
  :root {
    font-family: "Noto Sans", sans-serif;
    background: $background;
  }

  :global(body) {
    margin: 0;
  }

  main {
    text-align: start;
    padding: 1em;
    margin: 0;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 2rem;

    &.minimal {
      margin-left: 10rem;
    }

    .results {
      display: block;
    }

    @media screen and (max-width: 1024px) {
      display: block;
      &.minimal {
        margin-left: 0rem;
      }
    }
  }

  @media only screen and (max-width: 700px) {
    main {
      width: calc(100% - 2rem);
    }
  }
</style>

<Navbar {minimal} {mobile} {searchQuery} />
<main class:minimal>
  {#if !error && minimal}
    <div class="results">
      {#if !loading && corrections && corrections.length > 0}
        <Corrections data={corrections} />
      {/if}
      {#if !loading && suggestions && suggestions.length > 0}
        <Suggestions data={suggestions} />
      {/if}
      {#if mobile && infobox && !loading}
        <InfoBox data={infobox} />
      {/if}
      {#if !loading && answers && answers.length > 0}
        <Answers data={answers} />
      {/if}
      <svelte:component this={CardList} />
    </div>
    {#if !mobile && infobox && !loading}
      <InfoBox data={infobox} />
    {/if}
  {/if}
</main>
