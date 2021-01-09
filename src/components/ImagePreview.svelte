<script>
  import { onMount } from "svelte";
  import { images as imagesState } from "$stores/index";
  import { fly } from "svelte/transition";

  import { imageReset } from "../actions/index";
  import { dispatch } from "$utils/index";
</script>

<style lang="scss">
  @import "../../static/global.scss";
  preview {
    background: $background-darker;
    width: 400px;
    height: 100vh;
    position: fixed;
    top: 50px;
    padding: 0.5rem;
    padding-top: 1rem;
    right: 0;

    @media only screen and (max-width: 700px) {
      width: calc(100% - 1rem);
    }

    img {
      border-radius: 10px;
      width: 100%;
    }

    .top {
      display: flex;
      width: calc(100% - 0.8rem);

      margin: 0 0.8rem 0.4rem;

      @media only screen and (max-width: 700px) {
        margin: 0 0.4rem 0.4rem;
      }

      .close {
        font-size: 1.5rem;
        border-radius: 20px;
        background: lighten($color: $background, $amount: 4);
        color: darken($color: $font-color, $amount: 50);
        width: 1.5rem;
        text-align: center;
        padding: 0;
        height: 1.5rem;
        vertical-align: middle;
        text-align: center;
        line-height: 0.9;
        cursor: pointer;
        margin-inline-start: auto;

        &:hover {
          background: lighten($color: $background, $amount: 6);
          color: darken($color: $font-color, $amount: 30);
        }
      }
    }

    .info {
      span {
        color: $font-color;
        font-size: 17px;
      }

      .content {
        p {
          color: $font-color;
          font-size: 14px;
        }

        a {
          text-decoration: none;
          color: $link-color;
          overflow-wrap: break-word;
          font-size: 12px;
        }
      }
    }
  }
</style>

{#if $imagesState.selected}
  <preview transition:fly={{ x: 400, opacity: 1 }}>
    <div class="top">
      <div class="close" on:click={() => dispatch(() => imageReset('images'))}>
        &times;
      </div>
    </div>
    <img src={$imagesState.data.img_src} alt={$imagesState.data.title} />
    <div class="info">
      <span>{$imagesState.data.title}</span>
      <div class="content">
        <p>{$imagesState.data.content || ''}</p>
        <a href={$imagesState.data.url}>{$imagesState.data.url}</a>
      </div>
    </div>
  </preview>
{/if}
