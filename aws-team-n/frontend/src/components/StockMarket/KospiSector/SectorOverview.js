import { useRef } from 'react';
import React, { useEffect, useState } from 'react';
import { Line, PolarArea, getElementsAtEvent } from "react-chartjs-2"
import './SectorOverview.css'


const SectorOverview = () => {

  const chartRef = useRef();
  const onClick = (event) => {
    const elem = getElementsAtEvent(chartRef.current, event)
    if(!elem.length)
      return;
    let index = elem[0].index;
      
        setDate(xlabels[index]);

        let currPrice = [yCMPrice[index], yCDPrice[index], yCSPrice[index], yECPrice[index], yFPrice[index], yHIPrice[index], yITPrice[index], ySMPrice[index]]
        let vSum = parseInt(yCMVolume[index]) + parseInt(yCDVolume[index]) + parseInt(yCSVolume[index]) + parseInt(yECVolume[index]) + parseInt(yFVolume[index]) + parseInt(yHIVolume[index]) + parseInt(yITVolume[index]) + parseInt(ySMVolume[index])
        let currVolume = [360*(yCMVolume[index]/vSum), 360*(yCDVolume[index]/vSum), 360*(yCSVolume[index]/vSum), 360*(yECVolume[index]/vSum), 360*(yFVolume[index]/vSum), 360*(yHIVolume[index]/vSum), 360*(yITVolume[index]/vSum), 360*(ySMVolume[index]/vSum)]
        setPrice(currPrice)
        setVolume(currVolume)
  }

  const [update, setUpdate] = useState(false)
  const [volume, setVolume] = useState([45, 45, 45, 45, 45, 45, 45, 45]);
  const [price, setPrice] = useState([1, 1, 1, 1, 1, 1, 1, 1]);
  const [date, setDate] = useState('Choose Date');

  const [xlabels, setXlabels] = useState([]);
  const [yCDPrice, setYCDPrice] = useState([]);
  const [yCMPrice, setYCMPrice] = useState([]);
  const [yCSPrice, setYCSPrice] = useState([]);
  const [yECPrice, setYECPrice] = useState([]);
  const [yFPrice, setYFPrice] = useState([]);
  const [yHIPrice, setYHIPrice] = useState([]);
  const [yITPrice, setYITPrice] = useState([]);
  const [ySMPrice, setYSMPrice] = useState([]);
  const [yCDVolume, setYCDVolume] = useState([]);
  const [yCMVolume, setYCMVolume] = useState([]);
  const [yCSVolume, setYCSVolume] = useState([]);
  const [yECVolume, setYECVolume] = useState([]);
  const [yFVolume, setYFVolume] = useState([]);
  const [yHIVolume, setYHIVolume] = useState([]);
  const [yITVolume, setYITVolume] = useState([]);
  const [ySMVolume, setYSMVolume] = useState([]);

  useEffect(() => {
      fetch('http://127.0.0.1:5000/sm-graph4/sectordetail')
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
        setYCMPrice(tojson['cmprice']);
        setYCDPrice(tojson['cdprice']);
        setYCSPrice(tojson['csprice']);
        setYECPrice(tojson['ecprice']);
        setYFPrice(tojson['fprice']);
        setYHIPrice(tojson['hiprice']);
        setYITPrice(tojson['itprice']);
        setYSMPrice(tojson['smprice']);
        setYCMVolume(tojson['cmvolume']);
        setYCDVolume(tojson['cdvolume']);
        setYCSVolume(tojson['csvolume']);
        setYECVolume(tojson['ecvolume']);
        setYFVolume(tojson['fvolume']);
        setYHIVolume(tojson['hivolume']);
        setYITVolume(tojson['itvolume']);
        setYSMVolume(tojson['smvolume']);
      });
    },[update]);

  const getElementAtEvent = (elem) => {
    if(!elem.length)
      return;
    console.log(elem)
  }

  return (
    <div className="sector-overview-graph">
      <Line
        ref={chartRef}
        data= {{
          labels: xlabels,
          datasets: [
            {
              label: 'Construction & Machinery',
              data: yCMPrice,
              fill: false,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            },
            {
                label: 'Consumer Discretionary',
                data: yCDPrice,
                fill: false,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Consumer Staples',
                data: yCSPrice,
                fill: false,
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                borderColor: 'rgba(255, 205, 86, 1)',
                borderWidth: 1
            },
            {
                label: 'Energy & Chemicals',
                data: yECPrice,
                fill: false,
                backgroundColor: 'rgba(200, 200, 92, 0.2)',
                borderColor: 'rgba(200, 200, 92, 1)',
                borderWidth: 1
            },
            {
                label: 'Financials',
                data: yFPrice,
                fill: false,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
              label: 'Heavy Insdustry',
              data: yHIPrice,
              fill: false,
              backgroundColor: 'rgba(201, 203, 207, 0.2)',
              borderColor: 'rgba(201, 203, 207, 1)',
              borderWidth: 1
            },
            {
                label: 'IT',
                data: yITPrice,
                fill: false,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            },
            {
                label: 'Steel & Materials',
                data: ySMPrice,
                fill: false,
                backgroundColor: 'rgba(165, 109, 97, 0.2)',
                borderColor: 'rgba(165, 109, 97, 1)',
                borderWidth: 1
            },   
                    ]
                }}
                options= {{
                    responsive: false,
                    plugins: {
                        title:{
                            display: true,
                            text:"Kospi Sector Overview",
                            padding: 20,
                            font:{
                                size: 20
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
                  onClick={onClick}
                  width={840}
                  height={540}
                />
        <PolarArea
        data= {{
          labels: [
            'Construction & Machinery',
            'Consumer Discretionary',
            'Consumer Staples',
            'Energy & Chemicals',
            'Financials',
            'Heavy Insdustry',
            'IT',
            'Steel & Materials'
          ],
          datasets: [{
            label: 'My First Dataset',
            data: price,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)',
              'rgb(200, 200, 92)',
              'rgb(54, 162, 235)',
              'rgb(201, 203, 207)',
              'rgb(153, 102, 255)',
              'rgb(165, 109, 97)'
            ]
          }]
                }}
                options= {{
                    responsive: false,
                    plugins: {
                        title:{
                            display: true,
                            text: date,
                            padding: 20,
                            font:{
                                size: 20
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
                                    size: 14
                                }
                            },
                        },
                    },
                    elements:{
                        arc:{
                            angle:volume
                        }
                    }
                  }}
                width={460}
                height={520}
                
                />
    </div>
  );
};

export default SectorOverview;
