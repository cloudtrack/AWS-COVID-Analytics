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
  plotLines = [],
  title = "",
}) => {
  const seriesData = parseChartData(chartData);
  const plotLineData = parsePlotLines(plotLines);

  const onClick = (code) => {
    console.log("click:");
    // console.log(e);
    // callback function
    if (onSeriesClick) onSeriesClick(code);
  };

  const onLegendItemClick = (code) => {
    console.log(`Legend ${code} clicked`);
  };

  return {
    title: {
      text: title,
    },
    plotOptions: {
      line: {
        events: {
          legendItemClick: function (e) {
            onLegendItemClick(this.name);
            // return false; // to cancel default action
          },
        },
        showInLegend: true,
      },
      series: {
        point: {
          events: {
            click: function (e) {
              e.preventDefault();
              // console.log(this);
              const code = this.series.legendItem.textStr;
              onClick(code);
            },
            mouseOver: function (e) {
              // on mouse over
            },
          },
        },
      },
    },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function (self) {
          return formatDate(this.value);
        },
      },
      plotLines: plotLineData,
    },
    series: seriesData,
  };
};
