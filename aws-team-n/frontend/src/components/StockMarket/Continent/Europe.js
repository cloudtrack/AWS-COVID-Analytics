/* eslint-disable  */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from "react-chartjs-2"
import { getEurope } from "../../../store/StockMarketStore";


const Europe = () => {

  const dispatch = useDispatch();
  const xlabels = useSelector((state) => state.graph.date_europe);
  const yUK = useSelector((state) => state.graph.uk);
  const yItaly = useSelector((state) => state.graph.italy);
  const ySwiss = useSelector((state) => state.graph.swiss);
  const yGermany = useSelector((state) => state.graph.germany);
  const yFrance = useSelector((state) => state.graph.france);
  const yNetherlands = useSelector((state) => state.graph.netherlands);

  useEffect(() => {
    dispatch(getEurope());
  });
  
  return (
    <div>
  <Line
        data= {{
            labels: xlabels,
            datasets: [                        
                {
                    label: 'UK',
                    data: yUK,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'France',
                    data: yFrance,
                    fill: false,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Italy',
                    data: yItaly,
                    fill: false,
                    backgroundColor: 'rgba(165, 109, 97, 0.2)',
                    borderColor: 'rgba(165, 109, 97, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Germany',
                    data: yGermany,
                    fill: false,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Swiss',
                    data: ySwiss,
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Netherlands',
                    data: yNetherlands,
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
                    text:"Europe",
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
        height={360}
        
        />
</div>
);
};

export default Europe;
