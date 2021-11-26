import { formatDate, parseChartData, parsePlotLines } from "../utils";

/**
 * Hook to generate line chart options from given chart data.
 *
 * @returns config options for Highcharts Line Chart component
 */
export const useLineChart = ({
  chartData,
  onLegendItemClick,
  plotLines = [],
  title = "",
}) => {
  const seriesData = parseChartData(chartData);
  const plotLineData = parsePlotLines(plotLines);

  const onClick = (e) => {
    // callback function
  };

  return {
    title: {
      text: title,
    },
    plotOptions: {
      line: {
        events: {
          legendItemClick: function (e) {
            console.log(this.name);
            if (onLegendItemClick) onLegendItemClick(this.name);
            return false; // to cancel default action
          },
        },
        showInLegend: true,
      },
      series: {
        point: {
          events: {
            click: function (e) {
              e.preventDefault();
              console.log("click:");
              console.log(e.point);
              onClick(e);
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
