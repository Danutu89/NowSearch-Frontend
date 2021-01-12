<script>
  import { styles } from "$utils/index";
  export let logoWidth, searchState, onSearch;

  const categories = ["general", "videos", "images"];
</script>

<style lang="scss">
  @import "../../static/global.scss";
  subNav {
    height: 35px;
    width: calc(100% - var(--logoWidth) - 3rem);
    display: flex;
    background: lighten($color: $background-darker, $amount: 0);
    padding-left: calc(var(--logoWidth) + 3rem);
    border-bottom: lighten($color: $background-darker, $amount: 10) 1px solid;

    @media screen and (max-width: 1024px) {
      padding-left: 0.6rem;
      width: calc(100% - 0.6rem);
    }

    div {
      padding: 0.2rem 0.4rem 0.1rem 0.4rem;
      cursor: pointer;
      margin: auto 0.2rem;
      font-weight: 500;
      font-size: 15px;
      position: relative;

      &.active {
        font-weight: 600;
      }

      span {
        color: $font-color;
      }

      hr {
        margin: 0.4rem -0.4rem;
        position: absolute;
        width: 100%;
        border-color: $primary-color;
      }
    }
  }
</style>

<subNav use:styles={{ logoWidth }}>
  {#each categories as category}
    <div
      class:active={category === $searchState.category}
      on:click={() => onSearch(searchState.query, category)}>
      <span>{category}</span>
      {#if category === $searchState.category}
        <hr />
      {/if}
    </div>
  {/each}
</subNav>
