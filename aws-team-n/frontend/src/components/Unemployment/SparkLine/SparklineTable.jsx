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

    return (
      <SparkLine
        data={data}
        header={header}
        labels={dataLabels}
        chartType={dataAttr[1]}
      />
    );
  }

  render() {
    const style = {
      margin: "0 auto",
      borderCollapse: "collapse",
    };

    return <table style={style}>{this.toSparkLine(this.props.children)}</table>;
  }
}

export default SparkLineTable;
