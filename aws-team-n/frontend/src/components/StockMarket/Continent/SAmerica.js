/* eslint-disable  */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from "react-chartjs-2"
import { getSAmerica } from "../../../store/StockMarketStore";


const SAmerica = () => {

  const dispatch = useDispatch();
  const xlabels = useSelector((state) => state.graph.date_southamerica);
  const yPeru = useSelector((state) => state.graph.peru);
  const yBrazil = useSelector((state) => state.graph.brazil);
  const yChile = useSelector((state) => state.graph.chile);
  const yArgentina = useSelector((state) => state.graph.argentina);

  useEffect(() => {
    dispatch(getSAmerica());
  });
  
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
