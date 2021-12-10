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
            <div className="graphs">
                <div className="graph-item">
                    <CountryCompare />
                    <WorldRecover />
                </div>
                <div className="graph-item" id="section">
                    <Predict />
                </div>
                <div className="graph-item" id="section">
                <KospiSector />
                </div>
            </div>
        )
    }
};

export default StockMarket;
