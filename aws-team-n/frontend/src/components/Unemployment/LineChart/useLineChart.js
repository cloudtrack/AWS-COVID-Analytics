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
    console.log("click:");
    // console.log(e);
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
    },
    credits: {
      enabled: false,
    },
    chart: {
      // width: "100%",
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      itemMarginTop: 2,
      itemMarginBottom: 2,
    },
    plotOptions: {
      line: {
        events: {
          legendItemClick: function (e) {
            return handleLegendItemClick(this.name);
            // if (onLegendItemClick) return false; // to cancel default action
          },
        },
        showInLegend: showLegend,
      },

      series: {
        point: {
          events: {
            click: function (e) {
              e.preventDefault();
              // console.log(this);
              const code = this.series.legendItem.textStr;
              handleSeriesClick(code);
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
    yAxis: { title: { text: "Unemployment rate" } },
    series: seriesData,
  };
};
