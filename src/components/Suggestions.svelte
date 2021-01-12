<script>
  import { submitSearch } from "$utils/index";
  import { onMount } from "svelte";
  export let data;

  let mobile;

  onMount(() => {
    mobile = window.screen.width < 700;
  });
</script>

<style lang="scss">
  @import "../../static/global.scss";

  .suggestions {
    display: flex;
    width: 700px;

    @media screen and (max-width: 1024px) {
      width: 100%;
    }

    span {
      margin: 0.2rem 0;
      margin-right: 0.3rem;
      color: $font-color;
    }

    list {
      display: flex;
      flex-flow: wrap;
      width: 100%;
      margin-bottom: 1rem;

      .suggestion {
        border-radius: 10px;
        border: 1px solid lighten($color: $background, $amount: 15);
        display: block;
        text-align: start;
        color: $font-color;
        background: lighten($color: $background, $amount: 8);
        height: min-content;
        margin: 0.2rem 0.2rem;
        padding: 0.2rem 0.5rem;
        font-size: 13px;
        text-align: center;
        cursor: pointer;

        &:hover {
          background-color: lighten($color: $background, $amount: 15);
        }
      }
    }
  }
</style>

<div class="suggestions">
  {#if !mobile}<span> Suggestions: </span>{/if}
  <list>
    {#each data as suggestion, index}
      {#if !mobile || (mobile && index < 4)}
        <div
          class="suggestion"
          on:click={() => {
            submitSearch(suggestion);
          }}>
          {suggestion}
        </div>
      {/if}
    {/each}
  </list>
</div>
