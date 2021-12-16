import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const defaultData = [1, 2, 3];

const getdefaultOptions = (data, header = "", chartType = "area", labels) => {
  return {
    chart: {
      backgroundColor: null,
      borderWidth: 0,
      inverted: chartType === "column",
      type: chartType,
      margin: [5, 0, 5, 0],
      width: 150,
      height: 40,
      style: {
        overflow: "visible",
      },
      // small optimalization, saves 1-2 ms each sparkline
      skipClone: true,
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
      startOnTick: false,
      endOnTick: false,
      tickPositions: [],
    },
    yAxis: {
      endOnTick: false,
      startOnTick: false,
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
      tickPositions: [0],
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: "white",
      borderWidth: 1,
      hideDelay: 0,
      shared: true,
      padding: 4,
      borderColor: "silver",
      borderRadius: 3,
      // positioner: function (w, h, point) {
      //   return { x: point.plotX - w / 2, y: point.plotY - h };
      // },
      formatter: function () {
        const topLabel =
          chartType === "column" && labels
            ? labels[Highcharts.numberFormat(this.x, 0)]
            : header + ` Q${this.x}`;
        return "<b>" + topLabel + "</b><br/>" + this.y;
      },
    },
    plotOptions: {
      series: {
        animation: true,
        lineWidth: 2,

        shadow: false,
        states: {
          hover: {
            lineWidth: 2,
          },
        },
        marker: {
          radius: 1,
          states: {
            hover: {
              radius: 2,
            },
          },
        },
        fillColor: "rgba(153, 102, 255, 0.2)",
        lineColor: "rgba(153, 102, 255, 0.8)",
      },
      column: {
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "8px",
            fontFamily: "Verdana, sans-serif",
          },
        },
        colorByPoint: true,
      },
    },
    colors: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)"],
    series: [
      {
        data: data ? data : defaultData,
      },
    ],
  };
};

class SparkLine extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <td>
        <HighchartsReact
          highcharts={Highcharts}
          options={getdefaultOptions(
            this.props.data,
            this.props.header,
            this.props.chartType,
            this.props.labels,
          )}
        />
      </td>
    );
  }
}

export default SparkLine;
