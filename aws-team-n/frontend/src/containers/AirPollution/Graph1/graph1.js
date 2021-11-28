import React, {Component} from "react";
import { GeoJSON, MapContainer } from "react-leaflet";
import o3_2020_12_28 from '../data/o3-2020-12-28.json';
import o3_2021_04_29 from '../data/o3-2021-04-29.json';
import {Slider} from '@mui/material';
import 'leaflet/dist/leaflet.css';
import './graph1.css'

const MAX = 10

class Graph1 extends Component{
    state = {
        // mapSource: o3_2020_12_28,
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
        date: new Date('2020-12-28'),
        shortDate: '2020-12-28',
        prevVal: 0,
        o3_data: {
            '2020-12-28': o3_2020_12_28,
            // '2021-04-29': o3_2021_04_29
        },
        loading: false
        // o3_data: o3_data
    }
    componentDidMount(){
        this.setState({loading: true})
        var i = 0
        var data = this.state.o3_data
        var dates = []
        while(i < MAX){
            var newDay = new Date(this.state.date.getTime() + i * 24*60*60*1000)
            var date = newDay.toISOString().split('T')[0]
            dates.push(date)
            i++
        }
        var process = [0, 1]
        process.forEach((ps) => {
            if (ps == 0){
                dates.forEach((date) => {
                    console.log(date)
                    fetch(`http://127.0.0.1:5000/ap-graph1/${date}`)
                        .then(resp =>
                        resp.json()
                    )
                    .then((item) => {
                        data[date] = item
                    })
                })
            }
            else{
                this.setState({...this.state, o3_data: data})
                this.setState({loading: false})
            }
        })
    }

    getColor = (d) => {
        return d > 50 ? '#800026' :
               d > 30  ? '#BD0026' :
               d > 25  ? '#E31A1C' :
               d > 15  ? '#FC4E2A' :
               d > 5   ? '#FD8D3C' :
               d > 2   ? '#FEB24C' :
               d > 1   ? '#FED976' :
                          '#FFEDA0';
    }
    style = (feature) => {
        return {
            fillColor: this.getColor(feature.properties.avg),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
    handleSliderChange = (ev, newVal) => {
        this.setState({loading: true})
        var newDay = new Date(this.state.date.getTime() + (newVal-this.state.prevVal) * 24*60*60*1000)
        var date = newDay.toISOString().split('T')[0]
        this.setState({date: newDay})
        this.setState({shortDate: date})
        this.setState({prevVal: newVal})
        console.log(this.state.shortDate)
        var keys = Object.keys(this.state.o3_data)
        if (keys.includes(date)){
            console.log("NO FETCH")
            this.setState({loading: false})
        }
        else{
            console.log("FETCH")
            console.log(new Date().toISOString())
            fetch(`http://127.0.0.1:5000/ap-graph1/${date}`)
              .then(resp =>
                resp.json()
              )
            .then((item) => {
                this.setState({...this.state, o3_data: {...this.state.o3_data, [date]: item}})
            })
            .then(() => {
                this.setState({loading: false})
            })
        }
    }


    render(){
        // console.log(Object.keys(this.state.o3_data))
        const data = !this.state.loading && this.state.o3_data[this.state.shortDate]['features']
        const position = [this.state.lat, this.state.lng];
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>My Map</h1>

                {
                    this.state.loading ? <h1>LOADING</h1>
                    :
                    <div>
                        <div style={{width: '80%'}}>
                            <Slider defaultValue={0} step={1} min={0} max={MAX}
                            valueLabelDisplay="auto" onChange={this.handleSliderChange}
                            />
                        </div>
                        <h3>{this.state.shortDate}</h3>
                        <MapContainer style={{ height: "80vh" }} zoom={2} center={[20, 100]}>
                        <GeoJSON
                            key={this.state.shortDate}
                            style={this.style}
                            data={data}
                        />
                        </MapContainer>
                    </div>
                }
            </div>
        )
    }
};

export default Graph1;