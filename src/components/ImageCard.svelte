<script>
  export let result, loading;
  import { onMount } from "svelte";
  import { styles } from "$utils/index";
  import { images as imagesState } from "$stores/index";

  import { imagesSelect } from "../actions/index";
  import { dispatch } from "$utils/index";

  let width,
    imageDimensions,
    image,
    mobile,
    cardWidth,
    scaledDimensions,
    borderRadius;

  $: (scaledDimensions = []), (cardWidth = 0), (borderRadius = "0px");

  onMount(() => {
    if (result.img_format) {
      imageDimensions = [result.img_format.width, result.img_format.height];
      const scale =
        imageDimensions[0] > imageDimensions[1]
          ? imageDimensions[0] / imageDimensions[1]
          : imageDimensions[1] / imageDimensions[0];
      scaledDimensions = [200, 200 * scale];

      console.log(scaledDimensions);

      if (parseInt(scaledDimensions[1], 10) - 10 < cardWidth)
        borderRadius = "0px";
      else borderRadius = "10px";
    }
    width = `${window.screen.width}px`;
  });
</script>

<style lang="scss">
  @import "../../static/global.scss";
  .card {
    border-radius: 10px;
    border: 1px solid lighten($color: $background, $amount: 15);
    display: grid;
    position: relative;
    text-align: start;
    color: $font-color;
    background: lighten($color: $background, $amount: 8);
    min-width: var(--cardWidth);
    max-width: var(--cardWidth);
    flex-grow: 1;
    margin: 0.5rem;
    cursor: pointer;

    &:after {
      content: "";
      flex-grow: 999999999;
    }

    @media screen and (max-width: 700px) {
      max-width: calc(var(--width));
      .content {
        img {
          margin: auto;
        }
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      overflow: hidden;

      img {
        height: 200px;
        border-top-left-radius: var(--borderRadius);
        border-top-right-radius: var(--borderRadius);
        margin: 0 auto;
      }

      .title {
        color: $link-color;
        text-decoration: none;

        &.loading {
          height: 1.5rem;
          width: 50%;
          margin: 1rem;
        }

        .text {
          display: block;
          overflow: hidden;
          padding: 1rem;

          span {
            line-height: 1.2;
          }
        }
      }

      .image {
        width: 100%;
        &.loading {
          height: 200px;
          width: 100%;
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

<figure
  use:styles={{ width: width, cardWidth: `${scaledDimensions[1]}px`, borderRadius }}
  class="card"
  bind:clientWidth={cardWidth}>
  {#if loading}
    <div class="content">
      <div class="image loading" />
      <div class="title loading" />
    </div>
  {:else}
    <div
      class="content"
      on:click={() => dispatch(() => imagesSelect(result, 'images'))}>
      <img src={result.img_src} alt={result.title} bind:this={image} />
      <a href={result.url} class="title">
        <div class="text"><span>{result.title}</span></div>
      </a>
    </div>
  {/if}
</figure>
