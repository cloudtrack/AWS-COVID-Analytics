import { parseChartData } from "./util";

/**
 * @returns config options for Highcharts Line Chart component
 */
export const useLineChart = ({
  chartData,
  onLegendItemClick,
  plotLines = [],
  showLabels = false,
  title = "",
}) => {
  const seriesData = parseChartData(chartData);

  const handleMouseOver = (point) => {
    // callback function
  };

  const plotLineArr = plotLines.map((item) => {
    return {
      color: "orange",
      width: 2,
      label: showLabels ? { text: item.name } : {},
      value: Date.parse(item.date),
      zIndex: 1,
    };
  });

  return {
    chart: {
      // height: '100%',
      // width: "100%",
    },
    title: {
      text: title,
    },
    plotOptions: {
      line: {
        events: {
          legendItemClick: function () {
            console.log(this.name);
            if (onLegendItemClick) onLegendItemClick(this.name);
            return false; // to cancel default action
          },
        },
        showInLegend: true,
      },
      series: {
        stacking: "normal",

        point: {
          events: {
            mouseDown: (function (self) {
              return function () {
                const point = {
                  x: this.x,
                  y: this.y,
                };
                // callback
                handleMouseOver(point);
              };
            })(this),
          },
        },
      },
    },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function () {
          return new Date(this.value).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          });
        },
      },
      plotLines: plotLineArr,
    },
    series: seriesData,
  };
};
