/* eslint-disable  */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from "react-chartjs-2"
import { getSectorOverview } from "../../../store/StockMarketStore";
import './SectorOverview.css'

const Detail = () => {
  const [sector, setSector] = useState('Choose Sector');
  const [volume, setVolume] = useState([]);
  const [price, setPrice] = useState([]);
  const update = false;

  const dispatch = useDispatch();
  const xlabels = useSelector((state) => state.graph.date_sector);
  const yCMPrice = useSelector((state) => state.graph.CMPrice);
  const yCMVolume = useSelector((state) => state.graph.CMVolume);
  const yCDPrice = useSelector((state) => state.graph.CDPrice);
  const yCDVolume = useSelector((state) => state.graph.CDVolume);
  const yCSPrice = useSelector((state) => state.graph.CSPrice);
  const yCSVolume = useSelector((state) => state.graph.CSVolume);
  const yECPrice = useSelector((state) => state.graph.ECPrice);
  const yECVolume = useSelector((state) => state.graph.ECVolume);
  const yFPrice = useSelector((state) => state.graph.FPrice);
  const yFVolume = useSelector((state) => state.graph.FVolume);
  const yHIPrice = useSelector((state) => state.graph.HIPrice);
  const yHIVolume = useSelector((state) => state.graph.HIVolume);
  const yITPrice = useSelector((state) => state.graph.ITPrice);
  const yITVolume = useSelector((state) => state.graph.ITVolume);
  const ySMPrice = useSelector((state) => state.graph.SMPrice);
  const ySMVolume = useSelector((state) => state.graph.SMVolume);

  useEffect(() => {
    dispatch(getSectorOverview());
  }, [update]);
  
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
