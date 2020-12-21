<script>
  export let data;
</script>

<style lang="scss">
  @import "../../static/global.scss";
  video-preview {
    border-radius: 10px;
    width: 200px;
    position: relative;
    color: $font-color;

    @media screen and (max-width: 500px) {
      width: 100%;
    }

    img {
      width: 100%;
      height: 100%;
    }

    .overlay {
      position: absolute;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      top: 0;

      .duration {
        color: $font-color;
        font-size: 12px;
        border-radius: 6px;
        background-color: transparentize($color: $background, $amount: 0.2);
        padding: 0.1rem 0.3rem;

        margin-right: 0.3rem;
        margin-bottom: 0.2rem;
        margin-inline-start: auto;
      }

      .play-button {
        text-decoration: none;
        text-decoration-line: none;
        margin: auto auto;
        bottom: -11px;
        border-radius: 20px;
        background-color: transparentize($color: $background, $amount: 0.2);
        padding: 0.4rem 1rem;
        color: $font-color;
      }
    }
  }
</style>

<video-preview>
  <a href={data.url}>
    <img src={data.thumbnail} alt={data.title} />

    <div class="overlay">
      <div class="play-button">Play</div>

      {#if data.length}<span class="duration">{data.length}</span>{/if}
    </div>
  </a>
</video-preview>
