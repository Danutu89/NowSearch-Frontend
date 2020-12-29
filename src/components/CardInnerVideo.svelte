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
  .grids {
    grid-auto-flow: column;
    grid-template-columns: 200px;
    grid-gap: 1rem;
    display: grid;

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

      .content {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 20px;
        grid-gap: 0.5rem;
        overflow: hidden;

        span {
          line-height: 1.2;
        }
      }
    }

    .description {
      width: 100%;
    }
  }
</style>

<div class="grids">
  <video-preview>
    <a href={data.url}>
      <img src={data.thumbnail} alt={data.title} />

      <div class="overlay">
        <div class="play-button">Play</div>

        {#if data.length}<span class="duration">{data.length}</span>{/if}
      </div>
    </a>
  </video-preview>
  <div class="content">
    <a href={data.url} class="title">
      <div class="content">
        <img
          src={`${data.parsed_url[0]}://${data.parsed_url[1]}/favicon.ico`}
          alt={data.parsed_url[1]}
          height="20px" />
        <span>{data.title}</span>
      </div>
    </a>
    <p class="description">{data.content}</p>
  </div>
</div>
