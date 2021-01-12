<script>
  import CurrencyConvertAnswer from "./CurrencyConvertAnswer";
  import WheaterAnswer from "./WheaterAnswer";
  export let data;
</script>

<style lang="scss">
  @import "../../static/global.scss";
  answer {
    border-radius: 10px;
    border: 1px solid lighten($color: $background, $amount: 7);
    display: block;
    text-align: left !important;
    color: $font-color;
    background: lighten($color: $background-darker-secondary, $amount: 0);
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

<answer>
  {#if data.answer === 'conversion'}
    <CurrencyConvertAnswer data={data.data} />
  {:else if data.answer === 'weather'}
    <WheaterAnswer data={data.data} />
  {:else}{data.answer}{/if}
</answer>
