import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useLineChart } from "./useLineChart";
import axios from "axios";

const BASE_URL =
  "https://vgexf4h4u8.execute-api.ap-northeast-2.amazonaws.com/beta/unemployment_rate";

// const headers = {
//   "Access-Control-Allow-Origin": "*",
//   "Content-Type": "application/json",
//   "Access-Control-Allow-Headers": "Content-Type",
//   "Access-Control-Allow-Credentials": true,
// };

/**
 * @returns Stacked Line Chart
 */
export const LineChart = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("OECD");

  useEffect(() => {
    axios
      .get(`${BASE_URL}`)
      .then((response) => {
        console.log("Successfully fetched unemployment chart data!\n");
        return response.data;
      })
      .then(({ body }) => {
        const data = JSON.parse(body);
        setFetchedData(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  const getSecondaryChartData = () => {
    if (fetchedData.length > 0) {
      const targetLocation = fetchedData.find(
        (item) => item.location === selectedLocation,
      );
      if (targetLocation) return [targetLocation];
    }
    return [];
  };

  const onLegendItemClick = (location) => {
    setSelectedLocation(location);
  };

  const options = useLineChart({
    chartData: fetchedData,
    title: "Unemployment Rate by Country",
    onLegendItemClick,
  });

  const secondaryOptions = useLineChart({
    chartData: getSecondaryChartData(fetchedData),
    title: `${selectedLocation} Unemployment Rate`,
  });

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <HighchartsReact highcharts={Highcharts} options={secondaryOptions} />
    </div>
  );
};
