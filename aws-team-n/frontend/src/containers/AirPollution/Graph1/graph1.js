import React, {Component, useMemo} from "react";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";

import {Slider} from '@mui/material';
import 'leaflet/dist/leaflet.css';
import './graph1.css'

import source from '../data/o3.json';

const MAX = 365

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
  }
const getColor = (d) => {
    return d > 50 ? '#800026' :
           d > 30  ? '#BD0026' :
           d > 25  ? '#E31A1C' :
           d > 15  ? '#FC4E2A' :
           d > 5   ? '#FD8D3C' :
           d > 2   ? '#FEB24C' :
           d > 1   ? '#FED976' :
                      '#AAAAAA';
}
const Legend = ({position, zoom}) => {
    const positionClass =
        (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright

    const grades = [0, 10, 20, 50, 100, 200, 500, 1000]

    // loop through our density intervals and generate a label with a colored square for each interval
    const Grades = grades.map((g, i) => {
        return <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div style={{"backgroundColor": getColor(g + 1), width: '18px', height: '18px', float: 'left', marginRight: '8px', opacity: 0.7}}></div>
                    <div style={{lineHeight: '18px', color: '#555'}}>
                        {g}
                        {grades[i+1] ? <span> &ndash; {grades[i+1]}</span> : '+'}
                    </div>
                </div>
    })
    return (
        <div className={positionClass}>
            <div style={{marginBottom: 10, marginRight: 10, padding: 8, backgroundColor: '#FFFFFFCC', borderRadius: 5,
            boxShadow: "5px 5px 5px #AAAAAA"}}>
                {Grades}
            </div>
            <div style={{paddingBottom: 17}}></div>
        </div>
    )
}

class Graph1 extends Component{
    state = {
        date: new Date('2020-12-28'),
        shortDate: '2020-12-28',
        prevVal: 0,
        loading: false,
        value: 0,
        data: null,
        country: ''
    }
    componentDidMount(){
        const date = "2021-04-29"
        var features = source['features'].filter((val) => {
            return val['properties']['date'] == date || val['properties']['date'] == null
        })
        const data = {
            "type": "FeatureCollection",
            "features": features
        }
        this.setState({data: data})

        // console.log(this.refs.map);
    }


    style = (feature) => {
        return {
            fillColor: getColor(feature.properties.avg),
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
            return val['properties']['date'] == date || val['properties']['date'] == null
        })
        const data = {
            "type": "FeatureCollection",
            "features": features
        }
        this.setState({data: data})
        this.setState({loading: false})
    }

    updateValue = (val, country) => {

            this.setState({value: val ? val.toFixed(3) : "unknown", country: country ? country : ""})
    }


    render(){
        const outerBounds = [
                [84.227542, -168.776165],
                [-84.999685, 188.872239],
              ]
        const Info = ({position, _}) => {
            const positionClass =
                (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
            return (
                <div className={positionClass}>
                    <div style={{marginTop: 10, marginRight: 10, padding: 8, backgroundColor: '#FFFFFFCC', borderRadius: 5,
                        boxShadow: "5px 5px 5px #AAAAAA", width: 200, height: 60, justifyContent: 'center', display: 'flex',
                        flexDirection: 'column'}}>
                        <div>Average O3 concentration in </div>
                        {this.state.country}: {this.state.value}
                    </div>
                </div>
            )
        }
        return (
            <div style={{justifyContent: "center", marginLeft: 50, marginRight: 50, marginBottom: 50,
                }}>
                    <h1 style={{fontSize: '24px', fontWeight: 800, paddingTop: 15}}>O3 concentration in the world</h1>
                {
                    this.state.loading ? <h1>LOADING</h1>
                    :
                    <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                        <div style={{width: "90%", borderWidth: 1, marginTop: 10, marginBottom: 10,}}>
                            <Slider defaultValue={0} step={1} min={0} max={MAX}
                            valueLabelDisplay="off" onChange={this.handleSliderChange} color="secondary"
                            />
                            <h3 >{this.state.shortDate}</h3>
                        </div>

                        <MapContainer style={{ height: "80vh", padding: 50, backgroundColor: '#F8F8F8' }} zoom={1.5}
                            center={[20.955188, 11.566430]} maxZoom={5} minZoom={0} bounds={outerBounds} maxBounds={outerBounds}
                        >
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
                                            this.updateValue(feature.properties.avg, feature.properties.country)
                                        },
                                    });

                                }}
                            />
                            <Info position={"topright"}/>
                            <Legend position={"bottomright"}/>
                        </MapContainer>
                    </div>
                }
            </div>
        )
    }
}

export default Graph1;