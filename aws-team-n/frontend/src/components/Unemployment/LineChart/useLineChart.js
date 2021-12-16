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
    plotOptions: {
      spline: {
        events: {
          legendItemClick: function (e) {
            return handleLegendItemClick(this.name);
          },
        },
        showInLegend: showLegend,
        lineWidth: 0,
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
          return formatDate(this.value);
        },
      },
      plotLines: plotLineData,
      zoomEnabled: true,
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true,
    },
    yAxis: {
      title: { text: "Unemployment rate" },
      zoomEnabled: false,
    },
    series: seriesData,
  };
};
