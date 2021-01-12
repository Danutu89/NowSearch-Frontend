<script>
  import Line from "svelte-chartjs/src/Line.svelte";
  import { onMount } from "svelte";
  import { styles } from "$utils/index";
  export let data;

  let selectedIndex = 0,
    chartData = {},
    labels = [],
    mobile = false;

  labels = [
    `${data.forecast.forecastday[selectedIndex].hour[6].temp_c}° 6AM`,
    `${data.forecast.forecastday[selectedIndex].hour[9].temp_c}° 9AM`,
    `${data.forecast.forecastday[selectedIndex].hour[12].temp_c}° 12AM`,
    `${data.forecast.forecastday[selectedIndex].hour[15].temp_c}° 3PM`,
    `${data.forecast.forecastday[selectedIndex].hour[18].temp_c}° 6PM`,
    `${data.forecast.forecastday[selectedIndex].hour[21].temp_c}° 9PM`,
    `${data.forecast.forecastday[selectedIndex].hour[23].temp_c}° 11AM`,
  ];

  let options = {
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          display: false,
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          display: false,
        },
      ],
    },
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    showTooltips: false,
    events: [],
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  $: if (data.forecast.forecastday[selectedIndex])
    chartData = {
      datasets: [
        {
          data: [
            data.forecast.forecastday[selectedIndex].hour[6].temp_f,
            data.forecast.forecastday[selectedIndex].hour[9].temp_f,
            data.forecast.forecastday[selectedIndex].hour[12].temp_f,
            data.forecast.forecastday[selectedIndex].hour[15].temp_f,
            data.forecast.forecastday[selectedIndex].hour[18].temp_f,
            data.forecast.forecastday[selectedIndex].hour[21].temp_f,
            data.forecast.forecastday[selectedIndex].hour[0].temp_f,
          ],
          borderWidth: 3,
          backgroundColor: "#666666",
          borderColor: "#aaaaaa",
        },
      ],
      labels: ["", "", "", "", "", "", ""],
    };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const selectDay = (index) => {
    selectedIndex = index;
  };

  onMount(() => {
    const chart = document.querySelector("canvas");
    chart.height = 22;
    chart.style = "height: 22px;border-radius: 6px;";
    mobile = window.screen.width < 700;
  });
</script>

<style lang="scss">
  @import "../../static/global.scss";
  container {
    display: flex;
    flex-flow: column;

    .location {
      h3 {
        margin: 0;
      }
    }

    .col-50 {
      width: 50%;
    }

    .date {
      font-size: 12px;
      color: darken($color: $font-color, $amount: 35);
    }

    .info {
      display: flex;
      .data {
        padding: 0.5rem 0;
        display: flex;

        .icon {
          height: 70px;
          width: 70px;
        }

        .temp {
          font-size: 30px;
          font-weight: 700;
          margin: auto 0;

          .unit {
            font-size: 15px;
            font-weight: 600;
            vertical-align: top;
          }
        }
      }

      .measurements {
        display: flex;
        flex-flow: column;
        font-size: 12px;

        .data {
          margin: auto 0;
          height: 40px;
          display: flex;
          flex-flow: column;
        }
      }
    }

    .chart {
      display: flex;
      flex-flow: column;

      .labels {
        display: flex;

        .label {
          padding: var(--padding);
          height: 40px;
          text-align: center;

          font-size: 13px;
        }
      }
    }

    .days {
      display: flex;

      .day {
        display: flex;
        flex-flow: column;
        text-align: center;
        padding: 1rem 0.7rem;
        margin: 0 0.1rem;
        border: 1px solid lighten($color: $background-secondary, $amount: 10);
        border-radius: 6px;
        cursor: pointer;

        &:hover {
          border: 1px solid lighten($color: $background-secondary, $amount: 15);
          background-color: lighten(
            $color: $background-darker-secondary,
            $amount: 2
          );
        }

        .icon {
          margin: 0.5rem 0;
        }

        .temp-max {
          font-weight: 700;
        }

        .temp-max,
        .temp-min {
          margin: 0.1rem 0;
        }

        &.selected {
          border: 1px solid lighten($color: $background-secondary, $amount: 12);
          background-color: lighten(
            $color: $background-darker-secondary,
            $amount: 3
          );

          .day-name {
            font-weight: 700;
          }
        }
      }
    }
  }
</style>

<container>
  {#if data.forecast.forecastday[selectedIndex]}
    <div class="location">
      <h3>{data.location.name}, {data.location.country}</h3>
    </div>
    <div class="date">
      <span>{days[new Date(data.forecast.forecastday[selectedIndex].date).getDay()]}
        •
        {#if selectedIndex === 0}
          {data.current.condition.text}
        {:else}
          {data.forecast.forecastday[selectedIndex].day.condition.text}
        {/if}</span>
    </div>
    <div class="info">
      <div class="col-50 data">
        {#if selectedIndex === 0}
          <img src={data.current.condition.icon} alt="condition" class="icon" />
        {:else}
          <img
            src={data.forecast.forecastday[selectedIndex].day.condition.icon}
            alt="condition"
            class="icon" />
        {/if}
        <span class="temp">
          {#if selectedIndex === 0}
            {data.current.temp_c}
          {:else}{data.forecast.forecastday[selectedIndex].day.avgtemp_c}{/if}
          <span class="unit">c</span>
        </span>
      </div>
      <div class="col-50 measurements">
        <div class="data">
          <span>Humidity:
            {#if selectedIndex === 0}
              {data.current.humidity}
            {:else}
              {data.forecast.forecastday[selectedIndex].day.avghumidity}
            {/if}%</span>
          <span>Wind
            {#if selectedIndex === 0}
              {data.current.wind_kph}
            {:else}
              {data.forecast.forecastday[selectedIndex].day.maxwind_kph}
            {/if}
            KPH
            {#if selectedIndex === 0}
              {data.current.wind_dir}
            {:else}
              {data.forecast.forecastday[selectedIndex].day.wind_dir || ''}
            {/if}</span>
        </div>
      </div>
    </div>
    <div class="chart">
      <Line data={chartData} {options} />
      <div class="labels">
        {#each labels as label}
          <div
            use:styles={{ padding: mobile ? '0.2rem 0.5rem' : '0.2rem 1.5rem' }}
            class="label">
            {label}
          </div>
        {/each}
      </div>
    </div>
    <div class="days">
      {#each data.forecast.forecastday as day, index}
        <div
          class="day"
          class:selected={selectedIndex === index}
          on:click={() => {
            selectDay(index);
          }}>
          <span
            class="day-name">{days[new Date(day.date).getDay()].slice(0, 3)}</span>
          <img
            height="60px"
            class="icon"
            src={day.day.condition.icon}
            alt="condition" />
          <span class="temp-max">{day.day.maxtemp_c}°</span>
          <span class="temp-min">{day.day.mintemp_c}°</span>
        </div>
      {/each}
    </div>
  {/if}
</container>
