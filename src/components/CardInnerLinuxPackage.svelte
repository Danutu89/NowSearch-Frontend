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

    .extra {
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
          src="https://archlinux.org/favicon.ico"
          alt={data.parsed_url[1]}
          height="20px" />
        <span>{data.title}</span>
      </div>
    </a>
    <p class="description">{data.content}</p>
    <div class="command">
      <span>sudo pacman -Sy {data.title}</span><button
        on:click={copy(`sudo pacman -Sy ${data.title}`)}><CopyIcon /></button>
    </div>
  </div>
  <div class="extra">
    <div class="chart">
      <Tooltip tip={`install size ${(data.i_size / 1048576).toFixed(2)}mb`}>
        <span>s</span>
      </Tooltip>
      <div
        class="line"
        style={`width: calc(${(data.i_size / 1048576) * 19}% - 1.8rem)`} />
    </div>
    <div class="chart">
      <Tooltip tip={`compressed ${(data.c_size / 1048576).toFixed(2)}mb`}>
        <span>c</span>
      </Tooltip>
      <div
        class="line"
        style={`width: calc(${(data.c_size / 1048576) * 19}% - 1.8rem)`} />
    </div>
    <div class="chart">
      <Tooltip
        tip={`compression ${((data.i_size / data.c_size) * 100).toFixed(2)}%`}>
        <span>cp</span>
      </Tooltip>
      <div
        class="line"
        style={`width: calc(${(data.i_size / data.c_size) * 100 > 0 ? 100 : (data.i_size / data.c_size) * 100}% - 1.8rem)`} />
    </div>
  </div>
</div>
