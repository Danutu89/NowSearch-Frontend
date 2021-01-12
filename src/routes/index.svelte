<script>
  import { onMount } from "svelte";
  import Navbar from "$components/Navbar.svelte";
  import InfoBox from "$components/InfoBox.svelte";
  import Suggestions from "$components/Suggestions.svelte";
  import Corrections from "$components/Corrections.svelte";
  import Answers from "$components/Answers.svelte";
  import InfiniteScroll from "$components/InfiniteScroll.svelte";
  import { searchMore } from "../actions/index";
  import { dispatch } from "$utils/index";
  import { searchReducer, imagesReducer } from "$reducers/index";
  import { searchInterceptor } from "$interceptors/index";
  import { search as searchState, images as imagesState } from "$stores/index";
  import { addReducerAndInterceptors } from "$utils/index";
  import { submitSearch } from "$utils/index";

  let CardList,
    ImagesList,
    MovieList,
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
    movies,
    page = 1,
    loadingMore = false,
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

    module = await import("$components/MovieList");
    MovieList = module.default;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    searchQuery = urlParams.get("q");
    searchCategory = urlParams.get("category");
    console.log(searchCategory);

    if (searchQuery && searchQuery.length > 0) {
      submitSearch(searchQuery, searchCategory || "general");
    }

    mobile = window.screen.width < 700;

    const unsubscribe = searchState.subscribe((value) => {
      console.log(value);
      minimal = value.searched;
      loading = value.loading;
      error = value.error;
      query = value.query;
      category = value.category;
      loadingMore = value.loadingMore;
      if (value.loading == false && value.searched) {
        infobox = value.data.infoboxes ? value.data.infoboxes[0] : null;
        suggestions = value.data.suggestions;
        answers = value.data.answers;
        corrections = value.data.corrections;
        movies = value.data.movies;
        page = value.page;
        loadingMore = value.loadingMore;
      }
    });
  });
</script>

<style lang="scss">
  @import "../../static/global.scss";
  :root {
    font-family: "DDG_ProximaNova", "DDG_ProximaNova_UI_0",
      "DDG_ProximaNova_UI_1", "DDG_ProximaNova_UI_2", "DDG_ProximaNova_UI_3",
      "DDG_ProximaNova_UI_4", "DDG_ProximaNova_UI_5", "DDG_ProximaNova_UI_6",
      "Proxima Nova", "Helvetica Neue", "Helvetica", "Segoe UI", "Nimbus Sans L",
      "Liberation Sans", "Open Sans", FreeSans, Arial, sans-serif;
    background: $background-secondary;
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
      overflow-x: hidden;
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
    {#if ['general', 'videos', 'movies'].includes(category)}
      <div class="results">
        {#if !loading && corrections && corrections.length > 0}
          <Corrections data={corrections} />
        {/if}
        {#if !loading && suggestions && suggestions.length > 0}
          <Suggestions data={suggestions} />
        {/if}
        {#if !loading && movies && movies.length > 1}
          <MovieList data={movies} />
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
<InfiniteScroll
  hasMore={!loadingMore}
  threshold={200}
  on:loadMore={() => dispatch(() => searchMore(page + 1, 'home'))} />
