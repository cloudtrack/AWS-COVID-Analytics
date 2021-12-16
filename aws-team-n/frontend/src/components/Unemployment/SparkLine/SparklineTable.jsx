import React from "react";
import SparkLine from "./Sparkline";

class SparkLineTable extends React.Component {
  constructor(props) {
    super(props);
  }

  toSparkLine(children, params) {
    let header;

    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      if (child.type === "th") header = child.props.children;

      if (child.props["data-sparkline"]) {
        return this.sparkLine(child, header);
      }

      if (child.props.children) {
        child = React.cloneElement(child, {
          children: this.toSparkLine(child.props.children),
        });
      }

      return child;
    });
  }

  sparkLine(element, header) {
    const dataAttr = element.props["data-sparkline"].split("; ");

    const dataLabels = element.props["data-labels"]?.split(", ") || "";

    const data = dataAttr[0].split(", ").map(Number);
    // const options = {
    //   series: [
    //     {
    //       data,
    //       pointStart: 1,
    //     },
    //   ],

    //   tooltip: {
    //     headerFormat: `<span style="font-sze:10px">${header}, Q{point.x}: </span><br/>`,
    //     pointFormat: "<b>{point.y}.000</b> USD",
    //   },
    //   chart: {
    //     type: dataAttr[1] || "area",
    //   },
    // };
    // console.log("data attribute: " + dataAttr[1]);
    // console.log(typeof dataAttr[1]);
    return (
      <SparkLine
        data={data}
        header={header}
        labels={dataLabels}
        chartType={dataAttr[1]}
      />
    );
    // return <SparkLine options={options} />;
  }

  render() {
    const style = {
      margin: "0 auto",
      borderCollapse: "collapse",
    };

    // return <SparkLine />;
    return <table style={style}>{this.toSparkLine(this.props.children)}</table>;
  }
}

export default SparkLineTable;
