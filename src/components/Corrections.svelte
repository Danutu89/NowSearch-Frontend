<script>
  import { submitSearch } from "$utils/index";
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
      submitSearch(data[0]);
    }}>"{data[0]}"
  </span>?
</correction>
