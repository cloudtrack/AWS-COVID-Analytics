/* eslint-disable  */

import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2"

const SAmerica = () => {
    const [update, setUpdate] = useState(false)

    const [xlabels, setXlabels] = useState([]);
    const [yPeru, setYPeru] = useState([]);
    const [yBrazil, setYBrazil] = useState([]);
    const [yChile, setYChile] = useState([]);
    const [yArgentina, setYArgentina] = useState([]);
  
    useEffect(() => {
        fetch('http://127.0.0.1:5000/sm-graph1/samerica')
        .then(response => response.body)
        .then(rb => {
          const reader = rb.getReader();
        
          return new ReadableStream({
            start(controller) {
              function push() {
                reader.read().then( ({done, value}) => {
                  if (done) {
                    controller.close();
                    return;
                  }
                  controller.enqueue(value);
                  push();
                })
              }
              push();
            }
          });
        })
        .then(stream => {
          return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
        })
        .then(result => {
          const tojson = JSON.parse(result);
          setXlabels(tojson['date']);
          setYPeru(tojson['peru']);
          setYBrazil(tojson['brazil']);
          setYChile(tojson['chile']);
          setYArgentina(tojson['argentina']);
        });
      },[update]);
  
  return (
    <div>
  <Line
        data= {{
            labels: xlabels,
            datasets: [
                {
                    label: 'Peru',
                    data: yPeru,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Brazil',
                    data: yBrazil,
                    fill: false,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Chile',
                    data: yChile,
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Argentina',
                    data: yArgentina,
                    fill: false,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                
            ]
        }}
        options= {{
            responsive: false,
            plugins: {
                title:{
                    display: true,
                    text:"South America",
                    padding: 20,
                    font:{
                        size: 16
                    }
                },
                legend:{
                    position: "bottom",
                    align: "start",
                    labels:{
                        boxWidth: 20,
                        boxHeight: 15,
                        padding: 15,
                        font:{
                            size: 13
                        }
                    },
                },
            },
            elements:{
                point:{
                    radius:1,
                    borderWidth: 0
                },
                line:{
                    borderWidth:1
                }
            }
          }}
        width={350}
        height={330}
        
        />
</div>
);
};

export default SAmerica;
