<script>
  export let data;
  import { copy } from "$utils/index";
  import CopyIcon from "./Clipboard.svelte";
  import Tooltip from "svelte-tooltip";
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

      .command {
        padding: 0.2rem 0.4rem;
        background: lighten($color: $background-darker, $amount: 5);
        border-radius: 10px;
        border: 2px solid lighten($color: $background-darker, $amount: 10);
        display: flex;

        button {
          margin: 0.1rem;
          margin-inline-start: auto;
          padding: 0.2rem 0.2rem 0.1rem 0.3rem;
          background: lighten($color: $background-darker, $amount: 20);
          border: none;
          color: white;
          text-align: center;
          border-radius: 6px;
          cursor: pointer;

          &:focus {
            outline: none;
          }

          &:hover {
            background: lighten($color: $background-darker, $amount: 25);
          }

          &:active {
            background: lighten($color: $background-darker, $amount: 30);
          }
        }
      }
    }

    .scores {
      .chart {
        display: flex;
        justify-content: start;

        span {
          width: 1.8rem;
          margin: 0;
          padding: 0;
          display: inline-table;
          font-size: 13px;
        }

        .line {
          height: 2px;
          background: aquamarine;
          margin: auto 0;
        }
      }
    }
  }
</style>

<div class="grids">
  <div class="content">
    <a href={data.url} class="title">
      <div class="content">
        <img
          src="https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png"
          alt={data.parsed_url[1]}
          height="20px" />
        <span>{data.title}</span>
      </div>
    </a>
    <p class="description">{data.content}</p>
    <div class="command">
      <span>npm i {data.title}</span><button
        on:click={copy(`npm i ${data.title}`)}><CopyIcon /></button>
    </div>
  </div>
  <div class="scores">
    {#each Object.entries(data.scores) as [name, score]}
      <div class="chart">
        <Tooltip tip={`${name} ${parseFloat(score * 100).toFixed(2)}`}>
          <span>{name[0]}</span>
        </Tooltip>
        <div class="line" style={`width: calc(${score * 100}% - 1.8rem)`} />
      </div>
    {/each}
  </div>
</div>
