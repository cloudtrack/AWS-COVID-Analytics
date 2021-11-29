import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2"
import './SectorOverview.css'

const Detail = () => {
  const [update, setUpdate] = useState(false)
  const [price, setPrice] = useState([])
  const [volume, setVolume] = useState([])
  const [sector, setSector] = useState("Choose Sector")

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
  
  const handleClick = (num) => {
    switch (num) {
        case 1:
              setSector('Construction & Machinery')
              setPrice(yCMPrice)
              setVolume(yCMVolume)
              break;
        case 2:
              setSector('Consumer Discretionary')
              setPrice(yCDPrice)
              setVolume(yCDVolume)
              break;
        case 3:
              setSector('Consumer Staples')
              setPrice(yCSPrice)
              setVolume(yCSVolume)
              break;
        case 4:
              setSector('Energy & Chemicals')
              setPrice(yECPrice)
              setVolume(yECVolume)
              break;
        case 5:
              setSector('Financial')
              setPrice(yFPrice)
              setVolume(yFVolume)
              break;
        case 6:
              setSector('Heavy Industry')
              setPrice(yHIPrice)
              setVolume(yHIVolume)
              break;
        case 7:
              setSector('IT')
              setPrice(yITPrice)
              setVolume(yITVolume)
            break;
        case 8:
              setSector('Steel & Materials')
              setPrice(ySMPrice)
              setVolume(ySMVolume)
              break;
      
          default:
              setPrice(yCMPrice)
              setVolume(yCMVolume)
              break;
      }

  }
  return (
      <div className="contents">
        
    <div className="sectorgraph">
      <Bar
        data= {{
          labels: xlabels,
          datasets: [
            {
              label: 'Price (Normalized)',
              data: price,
              fill: false,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
                    ]
                }}
                options= {{
                    responsive: false,
                    plugins: {
                        title:{
                            display: true,
                            text: sector,
                            padding: 20,
                            font:{
                                size: 16
                            }
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
                width={450}
                height={400}
                />
        <Bar
        data= {{
          labels: xlabels,
          datasets: [{
            label: 'Volume (Won)',
            data: volume,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
                }}
                options= {{
                    responsive: false,
                    plugins: {
                        title:{
                            display: true,
                            text: sector,
                            padding: 20,
                            font:{
                                size: 16
                            }
                        },
                    },
                  }}
                width={450}
                height={400}
                
                />
    </div>
    <div className="buttons">
            <button className="button" onClick={() => handleClick(1)}> Construction & Machinery </button>
            <button className="button" onClick={() => handleClick(2)}> Consumer Discretionary </button>
            <button className="button" onClick={() => handleClick(3)}> Consumer Staples </button>
            <button className="button" onClick={() => handleClick(4)}> Energy & Chemicals </button>
            <button className="button" onClick={() => handleClick(5)}> Financials </button>
            <button className="button" onClick={() => handleClick(6)}> Heavy Industry </button>
            <button className="button" onClick={() => handleClick(7)}> IT </button>
            <button className="button" onClick={() => handleClick(8)}> Steel & Materials </button>
      </div>
    </div>
  );
};

export default Detail;
