<script>
  import { onMount } from "svelte";
  import Navbar from "$components/Navbar.svelte";
  import InfoBox from "$components/InfoBox.svelte";
  import Suggestions from "$components/Suggestions.svelte";
  import Corrections from "$components/Corrections.svelte";
  import Answers from "$components/Answers.svelte";
  import { search } from "../actions/index";
  import { dispatch } from "$utils/index";
  import { searchReducer, imagesReducer } from "$reducers/index";
  import { searchInterceptor } from "$interceptors/index";
  import { search as searchState, images as imagesState } from "$stores/index";
  import { addReducerAndInterceptors } from "$utils/index";

  let CardList,
    ImagesList,
    searchQuery = "",
    searchCategory = "",
    category,
    minimal,
    infobox,
    loading,
    suggestions,
    corrections,
    answers,
    mobile,
    query,
    error;

  onMount(async () => {
    addReducerAndInterceptors(
      searchInterceptor,
      searchReducer,
      "home",
      searchState
    );

    addReducerAndInterceptors(null, imagesReducer, "images", imagesState);

    let module = await import("$components/CardList.svelte");
    CardList = module.default;

    module = await import("$components/ImagesList.svelte");
    ImagesList = module.default;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    searchQuery = urlParams.get("q");
    searchCategory = urlParams.get("category");

    if (searchQuery && searchQuery.length > 0) {
      dispatch(() => search(searchQuery, "home", searchCategory || "general"));
    }

    mobile = window.screen.width < 700;

    const unsubscribe = searchState.subscribe((value) => {
      minimal = value.searched;
      loading = value.loading;
      error = value.error;
      query = value.query;
      category = value.category;
      if (value.loading == false && value.searched) {
        infobox = value.data.infoboxes ? value.data.infoboxes[0] : null;
        suggestions = value.data.suggestions;
        answers = value.data.answers;
        corrections = value.data.corrections;
      }
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

    margin: 0;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 2rem;

    &.images {
      display: block;
    }

    &.minimal.general,
    &.minimal.videos {
      margin-left: 10rem;

      @media screen and (max-width: 1024px) {
        margin: 1rem 0;
      }
    }

    .results {
      display: block;
      padding: 1em;
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
      width: calc(100%);
    }
  }
</style>

<svelte:head>
  <title>{minimal ? 'Search - ' + query : 'Fawkes'}</title>
  <meta
    name="description"
    content="Search the world's information, including webpages, images, videos and more" />
</svelte:head>

<Navbar {minimal} {mobile} />
<main class:minimal class={`${category}`}>
  {#if !error && minimal}
    {#if ['general', 'videos'].includes(category)}
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
    {:else if category === 'images'}
      <svelte:component this={ImagesList} />
    {/if}
  {/if}
</main>
