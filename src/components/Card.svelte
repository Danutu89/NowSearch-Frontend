<script>
  export let result, loading;
  import { onMount } from "svelte";

  import CardVideo from "./CardVideo";
  import { styles } from "$utils/index";

  let width;

  if (result.content && result.content.split("—").length > 0) {
    const splitted = result.content.split("—");
    if (splitted.length > 1) {
      result.date = splitted[0];
      result.content = splitted[1];
    } else {
      result.content = splitted[0];
    }
  }

  onMount(() => {
    width = `${window.screen.width}px`;
  });
</script>

<style lang="scss">
  @import "../../static/global.scss";
  card {
    border-radius: 10px;
    border: 1px solid lighten($color: $background, $amount: 15);
    display: grid;
    position: relative;
    text-align: start;
    padding: 1rem;
    color: $font-color;
    background: lighten($color: $background, $amount: 8);

    @media screen and (max-width: 700px) {
      max-width: calc(var(--width) - 4rem);
    }

    &.grids {
      grid-auto-flow: column;
      grid-template-columns: 200px;
      grid-gap: 1rem;

      @media screen and (max-width: 500px) {
        grid-auto-flow: row;
        grid-template-columns: 100%;
      }
    }

    .content {
      display: grid;
      overflow: auto;

      .title {
        color: $link-color;
        text-decoration: none;

        &.loading {
          height: 1.5rem;
          width: 50%;
          margin-bottom: 1rem;
        }

        .content {
          display: grid;
          grid-auto-flow: column;
          grid-template-columns: 20px;
          grid-gap: 0.5rem;
          overflow: auto;

          span {
            line-height: 1.2;
          }
        }
      }

      .description {
        width: 100%;
        &.loading {
          height: 1rem;
          width: 80%;
          margin-bottom: 0.5rem;
        }
      }

      .loading {
        position: relative;
        background-color: lighten($color: $background, $amount: 15);
        border-radius: 6px;
        overflow: hidden;

        &:after {
          display: block;
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          transform: translateX(-100%);
          background: -webkit-gradient(
            linear,
            left top,
            right top,
            from(transparent),
            color-stop(rgba(255, 255, 255, 0.2)),
            to(transparent)
          );

          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );

          /* Adding animation */
          animation: loading 0.8s infinite;
        }
      }
    }
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
</style>

<card
  class:grids={result && !loading && result.category === 'videos'}
  use:styles={{ width: width }}>
  {#if loading}
    <div class="content">
      <div class="title loading" />
      <div class="description loading" />
      <div class="description loading" style="width: 70%;" />
      <div class="description loading" style="width: 40%;" />
    </div>
  {:else}
    {#if result.category === 'videos'}
      <CardVideo data={result} />
    {/if}
    <div class="content">
      <a href={result.url} class="title">
        <div class="content">
          <img
            src={`${result.parsed_url[0]}://${result.parsed_url[1]}/favicon.ico`}
            alt={result.parsed_url[1]}
            height="20px" />
          <span>{result.title}</span>
        </div>
      </a>
      <p class="description">{result.content}</p>
    </div>
  {/if}
</card>
