<script>
  export let data;
  import { submitSearch } from "$utils/index";
</script>

<style lang="scss">
  @import "../../static/global.scss";
  movie {
    border-radius: 10px;
    border: 1px solid lighten($color: $background, $amount: 7);
    display: flex;
    flex-flow: column;
    position: relative;
    text-align: start;
    padding: 0rem;
    color: $font-color;
    background: lighten($color: $background-darker-secondary, $amount: 0);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
    width: 153px;
    cursor: pointer;

    img {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .info {
      padding: 0.7rem;
      font-size: 14px;
    }
  }
</style>

<movie
  id="movie-card"
  on:click={() => {
    submitSearch(data.title);
  }}>
  <img
    src={`https://themoviedb.org/t/p/w220_and_h330_face/${data.poster_path}`}
    alt={data.title}
    width="153px"
    height="230px" />
  <div class="info"><span class="title">{data.title}</span></div>
</movie>
