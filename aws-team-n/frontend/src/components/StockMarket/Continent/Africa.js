import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2"

const Africa = () => {
  const [update, setUpdate] = useState(false);

  const [xlabels, setXlabels] = useState([]);
  const [yEgypt, setYEgypt] = useState([]);
  const [ySouthAfrica, setYSouthAmerica] = useState([]);
  
  useEffect(() => {
    fetch('http://127.0.0.1:5000/sm-graph1/africa')
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
      setYEgypt(tojson['egypt']);
      setYSouthAmerica(tojson['sa']);
    });
  },[update]);
  
  return (
    <div>
      <Line
        data= {{
          labels: xlabels,
          datasets: [
            {
              label: 'South Africa',
              data: ySouthAfrica,
              fill: false,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
                            label: 'Egypt',
                            data: yEgypt,
                            fill: false,
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        },
                        
                        
                    ]
                }}
                options= {{
                    responsive: false,
                    plugins: {
                        title:{
                            display: true,
                            text:"Africa",
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

export default Africa;
