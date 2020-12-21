<script>
  export let data;
</script>

<style lang="scss">
  @import "../../static/global.scss";
  answer {
    border-radius: 10px;
    border: 1px solid lighten($color: $background, $amount: 15);
    display: block;
    text-align: left !important;
    color: $font-color;
    background: lighten($color: $background, $amount: 8);
    height: min-content;
    width: calc(700px - 2rem);
    padding: 1rem;
    margin: 0 0 1rem 0;
    text-align: center;

    @media screen and (max-width: 1024px) {
      width: calc(100% - 2rem);
    }
  }
</style>

<answer>{data}</answer>
