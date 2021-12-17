import { formatDate, parseChartData, parsePlotLines } from "../utils";

/**
 * Hook to generate line chart options from given chart data.
 *
 * @returns config options for Highcharts Line Chart component
 */
export const useLineChart = ({
  chartData,
  /**
   * Callback function when chart line series is clicked
   */
  onSeriesClick,
  onLegendItemClick,
  plotLines = [],
  title = "",
  showLegend = false,
}) => {
  const seriesData = parseChartData(chartData);
  const plotLineData = parsePlotLines(plotLines);

  const handleSeriesClick = (code) => {
    // callback function
    if (onSeriesClick) onSeriesClick(code);
  };

  const handleLegendItemClick = (code) => {
    console.log(`Legend ${code} clicked`);
    if (onLegendItemClick) {
      onLegendItemClick(code);
      return false; // to cancel default action
    }
  };

  return {
    title: {
      text: title,
      style: {
        fontWeight: "bold",
      },
    },
    credits: {
      enabled: false,
    },
    chart: {
      backgroundColor: "transparent",
      type: "spline",
      zoomType: "xy",
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      itemMarginTop: 2,
      itemMarginBottom: 2,
    },
    colors: [
      "rgba(54, 162, 235, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 99, 132, 1)",
      "rgba(165, 109, 97, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(200, 200, 92, 1)",
      "rgba(201, 203, 207, 1)",
    ],

    plotOptions: {
      spline: {
        events: {
          legendItemClick: function (e) {
            return handleLegendItemClick(this.name);
          },
        },
        showInLegend: showLegend,
        // lineWidth: 0,
        marker: {
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
        states: {
          hover: {
            marker: {
              enabled: false,
            },
          },
        },
      },
      series: {
        point: {
          events: {
            click: function (e) {
              e.preventDefault();
              const code = this.series.legendItem.textStr;
              handleSeriesClick(code);
            },
          },
        },
      },
    },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function (self) {
          return formatDate(this.value, false);
        },
      },
      plotLines: plotLineData,
      zoomEnabled: true,
      startOnTick: false,
      endOnTick: false,
      showLastLabel: true,
    },
    yAxis: {
      title: { text: "Unemployment rate" },
      zoomEnabled: false,
    },
    series: seriesData,
  };
};
