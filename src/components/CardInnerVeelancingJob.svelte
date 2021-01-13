<script>
  export let data;
  import { onMount } from "svelte";
  import * as Flags from "svelte-flagicon";
  import LocationIcon from "./LocationIcon";
  import DollarIcon from "./DollarIcon";
  import ListIcon from "./ListIcon";

  let Flag;

  onMount(async () => {
    Flag =
      Flags[
        `${
          data.location.country.code.charAt(0).toUpperCase() +
          data.location.country.code.slice(1).toLowerCase()
        }`
      ];
  });
</script>

<style lang="scss">
  @import "../../static/global.scss";

  div {
    &.grids {
      grid-auto-flow: column;
      grid-template-columns: 450px;
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

    .data {
      display: flex;
      flex-flow: column;
      font-size: 14px;

      .value {
        line-height: 1.2;
      }

      div {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        & > span,
        & > svg {
          margin: 0 0.2rem;
        }
        margin-bottom: 1rem;
      }
    }
  }
</style>

<div class="grids">
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
  <div class="data">
    <div class="price">
      <DollarIcon /><span class="value">{data.min_price}
        -
        {data.max_price}
        {data.currency.sign}</span>
    </div>
    <div class="location">
      <LocationIcon /><span class="value">{data.location.name}</span>
      {#if Flag}
        <Flag size="15" />
      {/if}
    </div>
    <div class="category">
      <ListIcon /><span>{data.job_category.name}</span>
    </div>
  </div>
</div>
