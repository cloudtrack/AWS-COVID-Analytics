import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const Europe = () => {
  const [update, setUpdate] = useState(false);

  const [xlabels, setXlabels] = useState([]);
  const [yUK, setYUK] = useState([]);
  const [yItaly, setYItaly] = useState([]);
  const [ySwiss, setYSwiss] = useState([]);
  const [yGermany, setYGermany] = useState([]);
  const [yFrance, setYFrance] = useState([]);
  const [yNetherlands, setYNetherlands] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/sm-graph1/europe")
      .then((response) => response.body)
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
        const tojson = JSON.parse(result);
        setXlabels(tojson["date"]);
        setYUK(tojson["uk"]);
        setYItaly(tojson["italy"]);
        setYSwiss(tojson["swiss"]);
        setYGermany(tojson["germany"]);
        setYFrance(tojson["france"]);
        setYNetherlands(tojson["netherlands"]);
      });
  }, [update]);

  return (
    <div>
      <Line
        data={{
          labels: xlabels,
          datasets: [
            {
              label: "UK",
              data: yUK,
              fill: false,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "France",
              data: yFrance,
              fill: false,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Italy",
              data: yItaly,
              fill: false,
              backgroundColor: "rgba(165, 109, 97, 0.2)",
              borderColor: "rgba(165, 109, 97, 1)",
              borderWidth: 1,
            },
            {
              label: "Germany",
              data: yGermany,
              fill: false,
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
            {
              label: "Swiss",
              data: ySwiss,
              fill: false,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Netherlands",
              data: yNetherlands,
              fill: false,
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: false,
          plugins: {
            title: {
              display: true,
              text: "Europe",
              padding: 20,
              font: {
                size: 16,
              },
            },
            legend: {
              position: "bottom",
              align: "start",
              labels: {
                boxWidth: 20,
                boxHeight: 15,
                padding: 15,
                font: {
                  size: 13,
                },
              },
            },
          },
          elements: {
            point: {
              radius: 1,
              borderWidth: 0,
            },
            line: {
              borderWidth: 1,
            },
          },
        }}
        width={320}
        height={330}
      />
    </div>
  );
};

export default Europe;
