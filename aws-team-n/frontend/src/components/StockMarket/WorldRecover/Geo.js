/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { getGeo } from '../../../store/StockMarketStore';

const Geo = () => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.graph.geo);
  useEffect(() => {
    dispatch(getGeo());
  });
    
    return(
      <div>
      <Chart
        width={'700px'}
        height={'600px'}
        chartType="GeoChart"
        data={[
          ['Country', 'Days to Recover'],
          ['United States', 36],
          ['England', 265],
          ['Argentina', 63],
          ['Italy', 251],
          ['Swiss', 93],
          ['South Africa', 100],
          ['China', 123],
          ['Australia', 226],
          ['Canada', 139],
          ['Brazil', 120],
          ['South Korea', 95],
          ['Netherlands', 115],
          ['HongKong', 284],
          ['France', 256],
          ['Germany', 95],
          ['Peru', 196],
          ['Mexico', 258],
          ['NewZealand', 85],
          ['Japan', 91]
        ]}
        options={{
          sizeAxis: { minValue: 0, maxValue: 100 },
          colorAxis: { colors: ['rgb(250, 220, 220)', 'rgb(255, 40, 80)'] }, // orange to blue
        }}
        mapsApiKey="AIzaSyDt5IMQuIdbTxzY_FwGINPCAvZrohn4iNs"
        rootProps={{ 'data-testid': '3' }}
      />
      </div>
    )
};
export default Geo