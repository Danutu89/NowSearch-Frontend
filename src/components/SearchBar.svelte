<script>
  import { onMount, onDestroy } from "svelte";
  import { search as searchStore } from "../stores/index";
  export let onSearch, minimal;

  let query = "";

  const unsubscriber = searchStore.subscribe((value) => {
    query = value.query;
  });

  const submit = () => {
    if (query !== "" && query !== searchStore.query) onSearch(query);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode == 13) {
      submit();
    }
  };

  onMount(() => {
    if (document) document.addEventListener("keypress", handleKeyPress);
  });

  onDestroy(() => {
    if (document) document.removeEventListener("keypress", handleKeyPress);
  });
</script>

<style lang="scss">
  @import "../../static/global.scss";
  .query-input {
    background-color: darken($color: $background, $amount: 5);
    border-radius: 2em;
    border: 2px solid $primary-color;
    display: flex;
    position: relative;

    &.minimal {
      height: 35px;
      width: 700px;
      margin: 0 1rem;

      @media screen and (max-width: 1024px) {
        margin: 0 1rem;
      }
    }

    input {
      font-family: inherit;
      font-size: inherit;
      padding: 0.5rem 1rem;
      color: $font-color;
      border: none;
      background: transparent;
      outline: none;
      font-variant-numeric: tabular-nums;
      width: 100%;
    }
    button {
      border: none;
      color: $font-color;
      background: $primary-color;
      font-family: inherit;
      font-weight: bold;
      height: 100%;
      padding: 1rem 2rem;
      border-radius: 0rem 2rem 2rem 0;
      cursor: pointer;
      margin-right: -1px;

      @media screen and (max-width: 700px) {
        padding: 1rem;
      }

      &.minimal {
        padding: 0.5rem 2rem;
        font-size: 1rem;

        @media screen and (max-width: 700px) {
          padding: 0.5rem 0.8rem;
          font-size: 13px;
        }
      }

      &:focus {
        outline: none;
      }

      &:hover {
        background-color: darken($color: $primary-color, $amount: 9);
      }

      &:active {
        background-color: darken($color: $primary-color, $amount: 12);
      }
    }
  }
</style>

<div class="query-input" class:minimal>
  <input
    name="query"
    class:minimal
    placeholder="Search"
    bind:value={query} /><button on:click={submit} class:minimal>Search</button>
</div>
