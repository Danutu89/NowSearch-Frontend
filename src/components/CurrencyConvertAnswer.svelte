<script>
  import Select from "svelte-select";
  export let data;

  const currencies = ["XBT", "EUR"];

  const updateFromAmmout = (value) => {
    data.amount = value;
  };
</script>

<style lang="scss">
  @import "../../static/global.scss";
  container {
    display: flex;

    --background: #{$background-darker};
    --disabledBackground: #{lighten($color: $background-darker, $amount: 1)};
    --border: 2px solid #{lighten($color: $background-darker, $amount: 10)};
    --borderFocusColor: #{lighten($color: $background-darker, $amount: 16)};
    --borderHoverColor: #{lighten($color: $background-darker, $amount: 20)};
    --disabledBorderColor: #{lighten($color: $background-darker, $amount: 4)};
    --borderRadius: 6px;
    --inputColor: #{$font-color};
    --inputPadding: 0.2rem;
    --listBackground: #{$background-darker};
    --itemIsActiveBG: #{lighten($color: $background-darker, $amount: 13)};
    --itemHoverBG: #{lighten($color: $background-darker, $amount: 15)};
    --itemPadding: 0.3rem;
    --selectedItemPadding: 0rem;
    --clearSelectBottom: 0.1rem;
    --clearSelectTop: 0.1rem;
    --clearSelectRight: 0.2rem;
    --padding: 0.2rem !important;
    --height: 30px;

    font-size: 15px;

    .info {
      width: 50%;
      .convert {
        width: 100%;
        .input-group {
          display: flex;
          width: 100%;

          input {
            width: 100px;
            margin-right: 1rem;
            border-radius: 6px;
            background: $background-darker;
            border: 2px solid lighten($color: $background-darker, $amount: 10);
            color: $font-color;
            padding: 0 0.4rem;

            &:focus {
              outline: none;
              border-color: lighten($color: $background-darker, $amount: 16);
            }

            &:hover {
              border-color: lighten($color: $background-darker, $amount: 20);
            }
          }
        }
      }
    }
  }
</style>

<container>
  <div class="info">
    <span>1
      {data.from_name.charAt(0).toUpperCase() + data.from_name.slice(1)}
      equals</span>
    <h2>
      {data.rate}
      {data.to_name.charAt(0).toUpperCase() + data.to_name.slice(1)}
    </h2>
    <div class="convert">
      <div class="input-group">
        <input name="from" placeholder={data.from} bind:value={data.amount} />
        <Select
          containerStyles="width: 120px;"
          selectedValue={data.from}
          items={currencies}
          isDisabled />
      </div>
      <div class="input-group">
        <input
          name="to"
          placeholder={data.to}
          value={data.amount * parseFloat(data.rate, 10)}
          disabled />
        <Select
          containerStyles="width: 120px;"
          selectedValue={data.to}
          items={currencies}
          isDisabled />
      </div>
    </div>
  </div>
  <div />
</container>
