<script>
  export let data;
  import { onMount } from "svelte";
  import MovieCard from "./MovieCard.svelte";
  import { styles, isVisible } from "$utils/index";

  let xPosition = 0,
    page = 1,
    endPage = 0,
    listWidth,
    visibleElements = 0,
    totalWidth = 0,
    movieCardWidth = 0,
    mobile = false;
  let listElement = null;
  const nextMovies = (e) => {
    xPosition = xPosition - totalWidth;
    page++;
  };

  const prevMovies = (e) => {
    xPosition = xPosition + totalWidth;
    page--;
  };

  onMount(() => {
    let elements = document.querySelectorAll("#movie-card");
    movieCardWidth = elements[0].clientWidth;
    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
      if (isVisible(element)) visibleElements++;
    }
    listWidth = listElement.scrollWidth;
    totalWidth = visibleElements * movieCardWidth;
    endPage = Math.round(data.length / visibleElements);
    mobile = window.screen.width < 700;
  });
</script>

<style lang="scss">
  @import "../../static/global.scss";
  movies {
    margin-bottom: 0.8rem;
    transition: transform 0.3s linear;
    position: relative;
    display: block;
    overflow: hidden;
    width: 700px;

    &.scroll {
      overflow: scroll hidden;
    }

    @media screen and (max-width: 1024px) {
      width: 100%;
    }

    .list {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 0.5rem;
      grid-template-columns: repeat(auto-fit, minmax(153px, 153px));
      width: fit-content;
      transition: transform 0.3s linear;
      position: relative;
      transform: translateX(var(--xPosition));
      overflow-x: visible;
      padding: 0.2rem 0;
    }

    button {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;

      height: 30px;
      border-radius: 20px;
      padding: 0.3rem;
      border: 1px solid lighten($color: $background, $amount: 7);
      color: $font-color;
      background: lighten($color: $background-darker-secondary, $amount: 0);
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
      cursor: pointer;

      &.next {
        right: 0.2rem;
        z-index: 5;
      }

      &.prev {
        left: 0.2rem;
        z-index: 5;
      }

      &:hover {
        svg {
          stroke: darken($color: $font-color, $amount: 5);
          fill: darken($color: $font-color, $amount: 5);
        }
        background: lighten($color: $background-darker-secondary, $amount: 5);
      }

      &:focus {
        outline: none;
      }

      svg {
        stroke: $font-color;
        fill: $font-color;
        height: 20px;
        width: 20px;
        margin: auto;
      }
    }
  }
</style>

<movies class:scroll={mobile}>
  {#if page > 1 && !mobile}
    <button class="prev" on:click={prevMovies}><svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"><path
          d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg></button>
  {/if}
  <div
    use:styles={{ xPosition: `${xPosition}px` }}
    class="list"
    bind:this={listElement}>
    {#each data as movie}
      <MovieCard data={movie} />
    {/each}
  </div>

  {#if page <= endPage && totalWidth + 50 < listWidth && !mobile}
    <button class="next" on:click={nextMovies}><svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"><path
          d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg></button>
  {/if}
</movies>
