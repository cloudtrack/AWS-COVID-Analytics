import React, {Component} from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

import no2_covid_p10 from "../data/aws-forecasts-no2_covid_p10_df.json"
import no2_covid_p50 from "../data/aws-forecasts-no2_covid_p50_df.json"
import no2_covid_p90 from "../data/aws-forecasts-no2_covid_p90_df.json"
import no2_p10 from "../data/aws-forecasts-no2_p10_df.json"
import no2_p50 from "../data/aws-forecasts-no2_p50_df.json"
import no2_p90 from "../data/aws-forecasts-no2_p90_df.json"
import o3_covid_p10 from "../data/aws-forecasts-o3_covid_p10_df.json"
import o3_covid_p50 from "../data/aws-forecasts-o3_covid_p50_df.json"
import o3_covid_p90 from "../data/aws-forecasts-o3_covid_p90_df.json"
import o3_p10 from "../data/aws-forecasts-o3_p10_df.json"
import o3_p50 from "../data/aws-forecasts-o3_p50_df.json"
import o3_p90 from "../data/aws-forecasts-o3_p90_df.json"
import so2_covid_p10 from "../data/aws-forecasts-so2_covid_p10_df.json"
import so2_covid_p50 from "../data/aws-forecasts-so2_covid_p50_df.json"
import so2_covid_p90 from "../data/aws-forecasts-so2_covid_p90_df.json"
import so2_p10 from "../data/aws-forecasts-so2_p10_df.json"
import so2_p50 from "../data/aws-forecasts-so2_p50_df.json"
import so2_p90 from "../data/aws-forecasts-so2_p90_df.json"


const list = {
    'NO2': [no2_covid_p10, no2_covid_p50, no2_covid_p90, no2_p10, no2_p50, no2_p90],
    'SO2': [so2_covid_p10, so2_covid_p50, so2_covid_p90, so2_p10, so2_p50, so2_p90],
    'O3': [o3_covid_p10, o3_covid_p50, o3_covid_p90, o3_p10, o3_p50, o3_p90]
}
class Graph2 extends Component{
    state = {
        data: {
            'NO2': null,
            'SO2': null,
            'O3': null
        }
    }
    componentDidMount(){
        const getFileName = (i, name) => {
            var type = ""
            if ((i % 3) == 0){
                type = "p10 "
            } else if((i % 3) == 1){
                type = "p50 "
            } else {
                type = "p90 "
            }
            name += type
            if (i < 3){
                name += "(w/ covid)"
            }
            return name
        }
        const datasets = ['NO2', 'SO2', 'O3'].map((idx) => {
            return list[idx].map((file, i) => {
                const values = file.map(data => {
                    return Number(data['Value'])
                })
                const ret = {}
                ret['label'] = getFileName(i, idx)
                ret['data'] = values
                ret['borderColor'] = i < 3 ? `rgba(255, 150, 132, ${(i+2)/4})` : `rgba(132, 99, 255, ${1/5 + (i%3+1)/7})`
                ret['backgroundColor'] =  i < 3 ? `rgba(255, 150, 132, ${(i+2)/4})` : `rgba(132, 99, 255, ${1/5 + (i%3+1)/7})`
                return ret
            })
        })
        const labels = no2_covid_p10.map(data => {
            return data['Timestamp'].split('T')[0]
        })
        const data = {
            'NO2': {
                labels,
                datasets: datasets[0]
            },
            'SO2': {
                labels,
                datasets: datasets[1]
            },
            'O3': {
                labels,
                datasets: datasets[2]
            },
          };

        this.setState({data: data})
    }

    render(){
        const getOptions = (idx) => {
            const options = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                        font:{
                            size: 14
                        }
                    },
                  },
                  title: {
                    display: true,
                    text: idx,
                    font: {
                        size: 25
                    }
                  },
                },
            };
            return options
        }


        return (
            <div>
                <div className="so2-chart" style={{height: "600px", marginBottom: "50px"}}>
                    {this.state.data['SO2'] && <Line options={getOptions('SO2')} data={this.state.data['SO2']} />}
                </div>
                <div className="o3-chart" style={{height: "600px"}}>
                    {this.state.data['O3'] && <Line options={getOptions('O3')} data={this.state.data['O3']} />}
                </div>
                <div className="no2-chart" style={{height: "600px"}}>
                    {this.state.data['NO2'] && <Line options={getOptions('NO2')} data={this.state.data['NO2']} />}
                </div>
            </div>
        )
    }
}

export default Graph2;