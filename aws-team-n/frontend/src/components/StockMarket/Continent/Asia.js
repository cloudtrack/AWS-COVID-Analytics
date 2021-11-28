/* eslint-disable  */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from "react-chartjs-2"
import { getAsia } from "../../../store/StockMarketStore";


const Asia = () => {
    const dispatch = useDispatch();

    const xlabels = useSelector((state) => state.graph.date_asia);
    const yChina = useSelector((state) => state.graph.china);
    const yKorea = useSelector((state) => state.graph.korea);
    const yHongKong = useSelector((state) => state.graph.hongkong);
    const yIndia = useSelector((state) => state.graph.india);
    const yJapan = useSelector((state) => state.graph.japan);
  
    useEffect(() => {
      dispatch(getAsia());
    });

    return (
        <div>
      <Line
            data= {{
                labels: xlabels,
                datasets: [
                    {
                        label: 'China',
                        data: yChina,
                        fill: false,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Korea',
                        data: yKorea,
                        fill: false,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Japan',
                        data: yJapan,
                        fill: false,
                        backgroundColor: 'rgba(165, 109, 97, 0.2)',
                        borderColor: 'rgba(165, 109, 97, 1)',
                        borderWidth: 1
                    },   
                    {
                        label: 'HongKong',
                        data: yHongKong,
                        fill: false,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'India',
                        data: yIndia,
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
                        text:"Asia",
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
                    zoom:{
                        pan: {
                            enabled: true
                        },
                        zoom: {
                            enabled: true,
                            wheel: {
                                enabled: true
                            }
                        }
                    },
                    autocolors: false,
                    annotation:{
                        annotations:{
                            box1:{
                                type: 'box',
                                xScaleID: 'x-axis-0',
                                yScaleID: 'y-axis-0',
                                xMin: '2020/01/02',
                                xMax: '2020/10/31',
                                yMin: 100,
                                yMax: 30000,
                                backgroundColor: 'rgba(0, 0, 0, 2)'
                            }
                        }
                    }
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
            height={360}
            
            />
  </div>
);
}
export default Asia