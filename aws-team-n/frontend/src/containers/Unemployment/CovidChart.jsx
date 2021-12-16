import React from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  formatDate,
  getTimestampFromDate,
} from "../../components/Unemployment/utils";

export const CovidChart = ({ covidData }) => {
  const parseCovidData = () => {
    const parsedData = covidData.map((item) => {
      return [getTimestampFromDate(item.date), item.total_cases];
    });

    return {
      data: parsedData,
      type: "spline",
      fillColor: "transparent",
      lineWidth: 2,
    };
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={getDefaultOptions(parseCovidData())}
      />
    </div>
  );
};

const getDefaultOptions = (data) => {
  return {
    title: {
      text: "hi",
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
          legendItemClick: function (e) {},
        },
        showInLegend: false,
        lineWidth: 0,
        marker: {
          radius: 2,
          states: {
            hover: {
              enabled: true,
              // lineColor: "rgb(100,100,100)",
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
              // console.log(this);
              const code = this.series.legendItem.textStr;
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
      zoomEnabled: true,
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true,
    },
    yAxis: {
      title: { text: "Unemployment rate" },
      zoomEnabled: false,
    },
    series: data,
  };
};
