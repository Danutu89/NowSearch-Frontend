<script>
  export let data;
</script>

<style lang="scss">
  @import "../../static/global.scss";
  box {
    border-radius: 10px;
    border: 1px solid lighten($color: $background, $amount: 15);
    display: block;
    text-align: start;
    color: $font-color;
    background: lighten($color: $background, $amount: 8);
    margin: 0 auto;
    height: min-content;
    width: 600px;
    text-align: center;

    img {
      padding: 1rem;
      height: 100%;
      @media screen and (max-width: 700px) {
        max-width: calc(100% - 4rem);
        height: auto;
      }
    }

    .content {
      padding: 1rem;
      display: grid;
      text-align: start;

      .attributes {
        margin: 1rem 0;
        display: grid;
        grid-gap: 0.5rem;
        .label {
          color: darken($color: $font-color, $amount: 25);
          .value {
            color: $font-color;
          }
        }
      }
    }

    @media screen and (max-width: 1024px) {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
</style>

<box>
  {#if data.img_src}<img src={data.img_src} alt={data.infobox} />{/if}
  <div class="content">
    <span>{data.content}</span>
    {#if data.attributes}
      <div class="attributes">
        {#each Object.entries(data.attributes) as [index, attribute]}
          <span class="label">{attribute.label}:
            <span class="value">{attribute.value}</span></span>
        {/each}
      </div>
    {/if}
  </div>
</box>
