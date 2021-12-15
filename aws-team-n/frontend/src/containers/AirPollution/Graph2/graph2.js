import React, {Component} from "react";
import * as d3 from "d3";

class Graph2 extends Component{
    state = {
        data: null
    }
    componentDidMount(){
        var data = null
        d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_world_gdp_with_codes.csv', function(rows){
            function unpack(rows, key) {
                return rows[key]
            }
            console.log(rows)
            data = [{
                type: 'choropleth',
                locations: unpack(rows, 'CODE'),
                z: unpack(rows, 'GDP (BILLIONS)'),
                text: unpack(rows, 'COUNTRY'),
                colorscale: [
                    [0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],
                    [0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],
                    [0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']],
                autocolorscale: false,
                reversescale: true,
                marker: {
                    line: {
                        color: 'rgb(180,180,180)',
                        width: 0.5
                    }
                },
                tick0: 0,
                zmin: 0,
                dtick: 1000,
                colorbar: {
                    autotic: false,
                    tickprefix: '$',
                    title: 'GDP<br>Billions US$'
                }
            }];
        })
        this.setState({data: data})
    }

    layout = {
        title: '2014 Global GDP<br>Source: <a href="https://www.cia.gov/library/publications/the-world-factbook/fields/2195.html"> CIA World Factbook</a>',
        geo:{
            showframe: false,
            showcoastlines: false,
            projection:{
                type: 'mercator'
            }
        }
    };

    render(){

        return (
            <div>

            </div>
        )
    }
}

export default Graph2;