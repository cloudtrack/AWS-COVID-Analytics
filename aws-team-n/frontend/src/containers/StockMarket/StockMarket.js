import React, {Component} from "react";
import CountryCompare from './CountryCompare';
import Chart from 'chart.js/auto';
import Predict from './Predict';
import KospiSector from './KospiSector';
import WorldRecover from "./WorldRecover";
import './StockMarket.css';

class StockMarket extends Component{
    render(){
        return (
            <div>
                <div className="world">
                    <CountryCompare />
                    <WorldRecover />
                </div>
                <Predict />
                <KospiSector />
            </div>
        )
    }
};

export default StockMarket;