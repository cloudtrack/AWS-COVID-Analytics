import { parseChartData } from "./util";

/**
 * @returns config options for Highcharts Line Chart component
 */
export const useLineChart = ({ chartData, title = "", onLegendItemClick }) => {
  const series = parseChartData(chartData);

  const handleMouseOver = (point) => {
    // callback function
  };

  return {
    title: {
      text: title,
    },
    plotOptions: {
      line: {
        events: {
          legendItemClick: function () {
            console.log(this.name);
            if (onLegendItemClick) onLegendItemClick(this.name);
            //return false; // to cancel default action
          },
        },
        showInLegend: true,
      },
      series: {
        stacking: "normal",

        point: {
          events: {
            mouseOver: (function (self) {
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

      //   plotBands: [
      //     {
      //       label: {
      //         text: "Recession 1",
      //         align: "center",
      //       },
      //       color: "lightyellow",
      //       from: dates[1],
      //       to: dates[2],
      //     },
      //     {
      //       label: {
      //         text: "Recession 2",
      //         align: "center",
      //       },
      //       color: "lightyellow",
      //       from: dates[dates.length - 10],
      //       to: dates[dates.length - 5],
      //     },
      //   ],
    },
    series: series,
  };
};
