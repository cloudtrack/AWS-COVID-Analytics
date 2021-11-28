import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from "react-chartjs-2"
import { getUSPredict } from "../../../store/StockMarketStore";


const USPredict = () => {

  const dispatch = useDispatch();

  const xlabels = useSelector((state) => state.graph.date_uspredict);
  const yReal = useSelector((state) => state.graph.usreal);
  const yPredict = useSelector((state) => state.graph.uspredict);

  useEffect(() => {
    dispatch(getUSPredict());
  });

  return (
    <div>
      <Line
        data= {{
          labels: xlabels,
          datasets: [
            {
              label: 'Real',
              data: yReal,
              fill: false,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 0.5)',
              borderWidth: 1
            },
            {
                label: 'Predict',
                data: yPredict,
                fill: false,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
              },
          ]
                }}
                options= {{
                    dataset:{
                        fill: false
                    },
                    responsive: false,
                    plugins: {
                        title:{
                            display: true,
                            text:"USA",
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
                
                width={640}
                height={450}
                
                />
    </div>
  );
};

export default USPredict;
