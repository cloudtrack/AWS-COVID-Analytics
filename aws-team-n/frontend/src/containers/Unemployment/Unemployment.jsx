import "./Unemployment.css";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import { useLineChart } from "../../components/Charts/Line/useLineChart";

const UNEMPLOYMENT_URL =
  "https://vgexf4h4u8.execute-api.ap-northeast-2.amazonaws.com/beta/unemployment_rate";

const MAJOR_EVENTS_URL =
  "https://gv2pn6qqx6.execute-api.ap-northeast-2.amazonaws.com/beta/major_events";
// const headers = {
//   "Access-Control-Allow-Origin": "*",
//   "Content-Type": "application/json",
//   "Access-Control-Allow-Headers": "Content-Type",
//   "Access-Control-Allow-Credentials": true,
// };

/**
 * Unemployment chart view for COVID dashboard
 * @param {} props
 * @returns
 */
export const Unemployment = (props) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [majorEvents, setMajorEvents] = useState([]);
  // whether chart finished loading
  const [loaded, setLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("OECD");

  useEffect(() => {
    fetchChartData();
    fetchMajorEvents();
  }, []);

  const fetchChartData = () => {
    axios
      .get(`${UNEMPLOYMENT_URL}`)
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
  };

  const fetchMajorEvents = () => {
    axios
      .get(`${MAJOR_EVENTS_URL}`)
      .then((response) => {
        console.log("Successfully fetched major events data!\n");
        return response.data;
      })
      .then(({ body }) => {
        const data = body;
        setMajorEvents(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    plotLines: majorEvents,
  });

  return (
    <div className="row-container">
      <div className="chart">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <div className="chart">
        <HighchartsReact highcharts={Highcharts} options={secondaryOptions} />
      </div>
    </div>
  );
};
