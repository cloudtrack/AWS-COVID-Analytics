import React from "react";
import { getCountryName } from "../countries";
import SparkLineTable from "./SparklineTable";
import "./Sparkline.css";

export const SparklineChart = ({
  chartData = [],
  youthUnemployment = [],
  onClick,
}) => {
  /**
   * chartData: Array<{
   *  location: alpha-3 iso
   *  rates: Array<{time, value}>
   *  median
   *  average
   * }>
   */
  const renderSparklines = () => {
    return chartData.map((item) => {
      const [hover, setHover] = React.useState(false);

      const sparklineData = item.rates
        .filter((item) => item.time >= "2020-Q4")
        .map((item) => parseFloat(item.value).toFixed(2))
        .join(", ");
      const youthData = youthUnemployment.filter(
        (youthItem) => youthItem.location === item.location,
      );
      const youthDataStr =
        youthData.length > 0
          ? `${youthData[0].unemployment_rate}, ${youthData[1].unemployment_rate} ; column`
          : "";
      return (
        <tr
          key={item.location}
          onClick={() => onClick(item.location)}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            backgroundColor: hover ? "rgba(255, 206, 86, 0.2)" : "transparent",
          }}
        >
          <th>{getCountryName(item.location)}</th>
          <td data-sparkline={sparklineData} />
          <td>{item.average.toFixed(2)}</td>
          <td>{item.average.toFixed(2)}</td>
          <td data-sparkline={youthDataStr} data-labels="Women, Men" />
        </tr>
      );
    });
  };

  return (
    <div id="result">
      <h1 className="title">OECD Unemployment Rate per Quarter (Post-Covid)</h1>
      <p className="subtitle">
        Unemployment rate of OECD member countries post-COVID 19 (2020 Q4 ~
        Present)
      </p>
      <div className="no-info prompt">
        Click on a location in the table for detailed information.
      </div>

      <div className="description-container">
        <div className="description row">
          <p>Average: 2002~Present</p>
        </div>
        <div className="description row">
          <p>Median: 2002~Present</p>
        </div>
      </div>
      <div className="description">
        <p>
          Youth unemployment: Latest unemployment rate of youths aged 15~24 by
          gender
        </p>
      </div>

      <div className="legend-container">
        <ul class="legend">
          <li>
            <span class="women"></span> Women
          </li>
          <li>
            <span class="men"></span> Men
          </li>
        </ul>
      </div>

      <SparkLineTable>
        <thead>
          <tr>
            <th>Location</th>
            <th>Unemployment Rate</th>
            <th>Average</th>
            <th>Median</th>
            <th>Youth Unemployment</th>
          </tr>
        </thead>
        <tbody id="tbody-sparkline">{renderSparklines()}</tbody>
      </SparkLineTable>
    </div>
  );
};
