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
      border-radius: 10px;
      border: 2px solid lighten($color: $background-darker, $amount: 10);
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
        margin: auto auto;
        padding: 1.4rem 0 0 0;
        color: $font-color;

        svg {
          height: 25px;
          width: 25px;
          fill: transparentize($color: $background, $amount: 0);
          vertical-align: middle;
          bottom: -11px;
          border-radius: 50px;
          background-color: transparentize($color: $background, $amount: 0.35);
          padding: 0.7rem 0.8rem;
          color: $font-color;
        }
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
    overflow: hidden;

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
      word-break: break-word;
    }
  }
</style>

<div class="grids">
  <video-preview>
    <a href={data.url}>
      <img src={data.thumbnail} alt={data.title} />

      <div class="overlay">
        <div class="play-button">
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 320.001 320.001"
            style="enable-background:new 0 0 320.001 320.001;"
            xml:space="preserve">
            <path
              d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288
            c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144
            c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z" />
          </svg>
        </div>

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
