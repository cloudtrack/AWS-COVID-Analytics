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
        // marginTop: 5,
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
        lineWidth: 1,
        shadow: false,
        states: {
          hover: {
            lineWidth: 1,
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
        fillOpacity: 0.25,
      },
      column: {
        color: "#910000",
        borderColor: "silver",
        labels: {
          format: "{value}%",
        },
      },
    },
    series: [
      {
        data: data ? data : defaultData,
        // pointStart: 1,
      },
    ],
  };
};

class SparkLine extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   const options = Highcharts.merge(defaultOptions, this.props.options);
  //   this.chart = Highcharts.chart(this.container, options);
  // }

  // componentWillUnmount() {
  //   this.chart.destroy();
  // }

  render() {
    return (
      <td>
        {/* ref={(container) => (this.container = container)}> */}
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
