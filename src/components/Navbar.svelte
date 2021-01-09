<script>
  import { onMount } from "svelte";
  import { search, searchReset } from "../actions/index";
  import { dispatch } from "$utils/index";
  import SubNav from "./SubNav.svelte";
  import { search as searchState } from "$stores/index";

  export let minimal,
    mobile,
    logoWidth = 0,
    logoImage,
    logoTextWidth = 0;

  let SearchBar;

  const submitSearch = (query, category = null) => {
    minimal = true;
    window.history.replaceState(
      null,
      null,
      `?q=${query}&category=${category || $searchState.category}`
    );
    dispatch(() => search(query, "home", category || $searchState.category));
  };

  onMount(async () => {
    const module = await import("$components/SearchBar.svelte");
    SearchBar = module.default;
    logoWidth = `${
      (logoImage.width / logoImage.height) * 40 + logoTextWidth / 2
    }px`;
    console.log(logoWidth, logoImage, logoTextWidth);
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

  div {
    display: flex;
    margin: 4rem auto;
    text-align: center;
    justify-content: center;
    cursor: pointer;

    &.mobile {
      padding: 0 0 0 1rem !important;
    }

    &.minimal {
      margin: initial;
      justify-content: center;
      padding: 0 1rem;
    }
    h1 {
      color: $font-color;
      font-size: 3rem;
      font-weight: 100;
      line-height: 1.1;

      &.minimal {
        font-size: 1.5rem;
        margin: auto 0;

        @media screen and (max-width: 1024px) {
          width: auto;
          margin: auto 0.2rem auto 1rem;
        }
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
  <div
    class:minimal
    class:mobile={minimal && mobile}
    on:click={() => dispatch(() => searchReset('home'))}>
    <img
      src="fawks-logo.svg"
      id="logo"
      bind:this={logoImage}
      height={minimal ? '40px' : '100px'}
      alt="vfawkes logo"
      class:minimal={mobile || minimal} />
    {#if (!mobile && !minimal) || !mobile}
      <h1 class:minimal bind:clientWidth={logoTextWidth}>Fawkes</h1>
    {/if}
  </div>
  <svelte:component this={SearchBar} onSearch={submitSearch} {minimal} />
</navbar>
{#if minimal}
  <SubNav {logoWidth} {searchState} onSearch={submitSearch} />
{/if}
