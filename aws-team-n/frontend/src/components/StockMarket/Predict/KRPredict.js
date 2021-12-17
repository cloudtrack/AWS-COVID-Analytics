import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const KRPredict = () => {
  const [update, setUpdate] = useState(false);

  const [xlabels, setXlabels] = useState([]);
  const [yReal, setYReal] = useState([]);
  const [yPredict, setYPredict] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/sm-graph3/krpredict")
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
        setYReal(tojson["real"]);
        setYPredict(tojson["prediction"]);
      });
  }, [update]);

  return (
    <div>
      <Line
        data={{
          labels: xlabels,
          datasets: [
            {
              label: "Real",
              data: yReal,
              fill: false,
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 0.5)",
              borderWidth: 1,
            },
            {
              label: "Predict",
              data: yPredict,
              fill: false,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          dataset: {
            fill: false,
          },
          responsive: false,
          plugins: {
            title: {
              display: true,
              text: "Korea",
              padding: 20,
              font: {
                size: 20,
                borderColor: "rgb(0, 0, 0)",
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
                  size: 14,
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
        width={600}
        height={420}
      />
    </div>
  );
};

export default KRPredict;
