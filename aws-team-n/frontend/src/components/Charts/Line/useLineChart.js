import { parseChartData } from "./utils";

/**
 * Hook to generate line chart options from given chart data.
 *
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

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const onClick = (e) => {
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
    title: {
      text: title,
    },

    plotOptions: {
      area: {
        events: {
          legendItemClick: function (event) {
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
            click: function (e) {
              e.preventDefault();
              console.log("click:");
              console.log(e.point);
              onClick(e);
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
      plotLines: plotLineArr,
    },
    series: seriesData,
  };
};
