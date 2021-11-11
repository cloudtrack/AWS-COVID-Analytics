import React, { Component } from 'react';
import Tabs from '../../components/Tabs/Tabs';
import AirPollution from '../AirPollution/AirPollution';
import StockMarket from '../StockMarket/StockMarket';
import Unemployment from '../Unemployment/Unemployment';
import './Mainpage.css'

class MainPage extends Component{
  render(){
    return (
      <div className="Mainpage">
        <Tabs>
          <AirPollution label="코로나와 대기오염도"/>
          <StockMarket label="stock-market"/>
          <Unemployment label="unemployment"/>
        </Tabs>
      </div>
    );
  }
}

export default MainPage;
