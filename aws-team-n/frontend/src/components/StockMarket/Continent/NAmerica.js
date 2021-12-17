/* eslint-disable  */

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const NAmerica = () => {
  const [update, setUpdate] = useState(false);

  const [xlabels, setXlabels] = useState([]);
  const [yUSA, setYUSA] = useState([]);
  const [yCanada, setYCanada] = useState([]);
  const [yMexico, setYMexico] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/sm-graph1/namerica")
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
        setYUSA(tojson["usa"]);
        setYCanada(tojson["canada"]);
        setYMexico(tojson["mexico"]);
      });
  }, [update]);

  return (
    <div>
      <Line
        data={{
          labels: xlabels,
          datasets: [
            {
              label: "USA",
              data: yUSA,
              fill: false,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Canada",
              data: yCanada,
              fill: false,
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1,
            },
            {
              label: "Mexico",
              data: yMexico,
              fill: false,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: false,
          plugins: {
            title: {
              display: true,
              text: "North America",
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
            zoom: {
              pan: {
                enabled: true,
              },
              zoom: {
                enabled: true,
                wheel: {
                  enabled: true,
                },
              },
            },
            autocolors: false,
            annotation: {
              annotations: {
                box1: {
                  type: "box",
                  xScaleID: "x-axis-0",
                  yScaleID: "y-axis-0",
                  xMin: "2020/01/02",
                  xMax: "2020/10/31",
                  yMin: 100,
                  yMax: 30000,
                  backgroundColor: "rgba(0, 0, 0, 2)",
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
        height={300}
      />
    </div>
  );
};

export default NAmerica;
