import React, {Component} from "react";
import { GeoJSON, MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import {Slider} from '@mui/material';
import 'leaflet/dist/leaflet.css';
import './graph1.css'

import source from '../data/o3.json';
import o3_2020_12_28 from '../data/o3-2020-12-28.json'

const MAX = 365

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
        loading: false,
        // o3_data: o3_data
        data: null,
        nullData: null,
        nonNullData: null
    }
    componentDidMount(){
        const date = "2021-04-29"
        var features = source['features'].filter((val) => {
            return val['properties']['date'] == date
        })
        const data = {
            "type": "FeatureCollection",
            "features": features
        }
        this.setState({data: data})
    }

    getColor = (d) => {
        return d > 50 ? '#800026' :
               d > 30  ? '#BD0026' :
               d > 25  ? '#E31A1C' :
               d > 15  ? '#FC4E2A' :
               d > 5   ? '#FD8D3C' :
               d > 2   ? '#FEB24C' :
               d > 1   ? '#FED976' :
                          '#AAAAAA';
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
        var features = source['features'].filter((val) => {
            return val['properties']['date'] == date
        })
        const data = {
            "type": "FeatureCollection",
            "features": features
        }
        this.setState({data: data})
        this.setState({loading: false})
    }

    render(){
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>My Map</h1>
                {
                    this.state.loading ? <h1>LOADING</h1>
                    :
                    <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                        <div style={{width: "80%", borderWidth: 1, margin: 50}}>
                            <Slider defaultValue={0} step={1} min={0} max={MAX}
                            valueLabelDisplay="auto" onChange={!this.state.loading && this.handleSliderChange}
                            />
                        </div>
                        <h3>{this.state.shortDate}</h3>
                        <MapContainer style={{ height: "80vh", padding: 50, backgroundColor: '#F8F8F8' }} zoom={2} center={[40.737, -73.923]} >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
                            />
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
                            />
                            <GeoJSON
                                key={this.state.shortDate}
                                style={this.style}
                                data={this.state.data}
                                onEachFeature={(feature, layer) => {
                                    layer.on({
                                        'mouseover': (e) => {
                                          layer.bindTooltip(feature.properties.avg.toString());
                                        }
                                      });
                                }}
                            />
                        </MapContainer>
                    </div>
                }
            </div>
        )
    }
}

export default Graph1;