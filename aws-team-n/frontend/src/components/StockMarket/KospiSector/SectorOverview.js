/* eslint-disable  */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line, PolarArea } from "react-chartjs-2"
import { getSectorOverview } from "../../../store/StockMarketStore";
import './SectorOverview.css'


const SectorOverview = () => {

  const [date, setDate] = useState('Choose Date');
  const [volume, setVolume] = useState([45, 45, 45, 45, 45, 45, 45, 45]);
  const [price, setPrice] = useState([1, 1, 1, 1, 1, 1, 1, 1]);

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
  });
  

  return (
    <div className="sector-overview-graph">
      <Line
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
                            text:"Kospi Sector",
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
                width={800}
                height={600}
                getElementAtEvent={(elements, event) => {
                    if (event.type === "click" && elements.length) {
                        let index = elements[0].index;
                        console.log(elements[0]);
                      
                        setDate(xlabels[index]);
                        console.log(date);

                        let currPrice = [yCMPrice[index], yCDPrice[index], yCSPrice[index], yECPrice[index], yFPrice[index], yHIPrice[index], yITPrice[index], ySMPrice[index]]
                        let vSum = parseInt(yCMVolume[index]) + parseInt(yCDVolume[index]) + parseInt(yCSVolume[index]) + parseInt(yECVolume[index]) + parseInt(yFVolume[index]) + parseInt(yHIVolume[index]) + parseInt(yITVolume[index]) + parseInt(ySMVolume[index])
                        let currVolume = [360*(yCMVolume[index]/vSum), 360*(yCDVolume[index]/vSum), 360*(yCSVolume[index]/vSum), 360*(yECVolume[index]/vSum), 360*(yFVolume[index]/vSum), 360*(yHIVolume[index]/vSum), 360*(yITVolume[index]/vSum), 360*(ySMVolume[index]/vSum)]
                        setPrice(currPrice)
                        setVolume(currVolume)
                    }
                  }}
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
                        arc:{
                            angle:volume
                        }
                    }
                  }}
                width={500}
                height={600}
                
                />
    </div>
  );
};

export default SectorOverview;
