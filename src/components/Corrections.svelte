<script>
  import { search } from "$actions/index";
  import { dispatch } from "$utils/index";
  export let data;
</script>

<style lang="scss">
  @import "../../static/global.scss";
  correction {
    color: $font-color;
    margin: -0.3rem 0 0.3rem 0;
    display: block;
    font-size: 14px;
    span {
      color: $link-color;
      cursor: pointer;
    }
  }
</style>

<correction>
  You mean
  <span
    on:click={() => {
      dispatch(() => search(data[0], 'home'));
    }}>"{data[0]}"
  </span>?
</correction>
