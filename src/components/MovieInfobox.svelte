<script>
  export let data;
  import { styles } from "$utils/index";

  let imagesWidth;
</script>

<style lang="scss">
  @import "../../static/global.scss";
  container {
    display: flex;
    flex-flow: column;
    width: 445px;

    @media screen and (max-width: 1024px) {
      width: initial;
    }

    .images {
      text-align: start;
      display: grid;
      grid-auto-flow: column;
      grid-gap: 0.1rem;
      width: 100%;
      img {
        margin: 0;
        width: calc(var(--width));
      }
    }
    .divider {
      width: calc(100% -2rem);
      margin: 0 1rem;
      border: 1px solid lighten($color: $background, $amount: 15);
    }

    .main_info {
      text-align: start;
      padding: 1.2rem 1rem;

      h3 {
        margin: 0;
      }

      span {
        font-size: 14px;
      }
    }

    .ratings {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      margin: 0 2rem;

      .rating {
        padding: 1.5rem 0.5rem;
        text-align: center;
        display: flex;
        flex-flow: column;

        .name {
          font-size: 15px;
          margin-bottom: 0.5rem;
          font-weight: 500;
          .score {
            font-size: 20px;
            font-weight: 800;
          }
        }
      }
    }
  }
</style>

<container>
  <div class="images" bind:clientWidth={imagesWidth}>
    <img
      src={`https://themoviedb.org/t/p/w220_and_h330_face/${data.poster_path}`}
      alt={data.title}
      use:styles={{ width: `${imagesWidth / 2}px` }}
      style="border-top-left-radius: 10px;" />
    <img
      src={`https://themoviedb.org/t/p/w220_and_h330_face/${data.backdrop_path}`}
      alt={data.title}
      use:styles={{ width: `${imagesWidth / 2}px` }}
      style="border-top-right-radius: 10px;" />
  </div>
  <div class="main_info">
    <h3>{data.title}</h3>
    <span>{data.release_date.split('-')[0]}</span>
    <p>{data.overview}</p>
  </div>
  <hr class="divider" />
  <div class="ratings">
    <div class="rating">
      <span class="name"> Popularity</span><span
        class="score">{data.popularity}</span>
    </div>
    <div class="rating">
      <span class="name">Vote Average</span><span
        class="score">{data.vote_average}</span>
    </div>
    <div class="rating">
      <span class="name">Vote Count</span><span
        class="score">{data.vote_count}</span>
    </div>
  </div>
</container>
