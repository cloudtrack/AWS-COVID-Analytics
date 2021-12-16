import React from "react";
import { getCountryName } from "../countries";
import SparkLineTable from "./SparklineTable";
import "./Sparkline.css";

export const SparklineChart = ({ chartData, onClick }) => {
  if (!chartData || chartData.length <= 0) return null;

  React.useEffect(() => {
    fetchYouthUnemployment();
  }, []);

  const [youthUnemployment, setYouthUnemployment] = React.useState([]);

  const fetchYouthUnemployment = () => {
    fetch(`http://127.0.0.1:5000/unemployment/youth`)
      .then((response) => {
        return response.body;
      })
      .then((rb) => {
        const reader = rb.getReader();

        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                push();
              });
            }
            push();
          },
        });
      })
      .then((stream) => {
        return new Response(stream, {
          headers: { "Content-Type": "text/html" },
        }).text();
      })
      .then((result) => {
        const json = JSON.parse(result);
        setYouthUnemployment(json.body);
      });
  };
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
          onMouseEnter={() => setHover(true)}
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
      <h1 className="title">OECD Unemployment Rate per Quarter</h1>
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
