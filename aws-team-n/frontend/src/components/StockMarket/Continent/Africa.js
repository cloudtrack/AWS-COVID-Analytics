/* eslint-disable  */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from "react-chartjs-2"
import { getAfrica } from "../../../store/StockMarketStore";


const Africa = () => {

  const update = false;
  const dispatch = useDispatch();
  const xlabels = useSelector((state) => state.graph.date_africa);
  const yEgypt = useSelector((state) => state.graph.egypt);
  const ySouthAfrica = useSelector((state) => state.graph.southafrica);

  useEffect(() => {
    dispatch(getAfrica());
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
