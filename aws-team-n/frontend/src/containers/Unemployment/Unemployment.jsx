import "./Unemployment.css";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import { useLineChart } from "../../components/Unemployment/LineChart/useLineChart";
import {
  EACountries,
  EUCountries,
  g7Countries,
  getCountryName,
} from "../../components/Unemployment/countries";

const UNEMPLOYMENT_URL =
  "https://vgexf4h4u8.execute-api.ap-northeast-2.amazonaws.com/beta/unemployment_rate";

const MAJOR_EVENTS_URL =
  "https://gv2pn6qqx6.execute-api.ap-northeast-2.amazonaws.com/beta/major_events";

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

  const onSeriesClick = (location) => {
    setSelectedLocation(location);
  };

  const oecdOptions = useLineChart({
    chartData: fetchedData,
    title: "OECD Unemployment Rate",
    onSeriesClick,
    showLegend: true,
  });

  const g7Options = useLineChart({
    chartData: fetchedData?.filter(
      (item) => item.location === "G-7" || g7Countries.includes(item.location),
    ),
    title: "G-7 Unemployment Rate",
    onSeriesClick,
    onLegendItemClick: onSeriesClick,
    showLegend: true,
  });

  const EAOptions = useLineChart({
    chartData: fetchedData?.filter(
      (item) => item.location === "EA" || EACountries.includes(item.location),
    ),
    title: "Euro Area Unemployment Rate",
    onSeriesClick,
    onLegendItemClick: onSeriesClick,
    showLegend: true,
  });

  const EUOptions = useLineChart({
    chartData: fetchedData?.filter(
      (item) => item.location === "EU" || EUCountries.includes(item.location),
    ),
    title: "European Union Unemployment Rate",
    onSeriesClick,
    onLegendItemClick: onSeriesClick,
    showLegend: true,
  });

  /** detailed country chart */
  const detailedOptions = useLineChart({
    chartData: getSecondaryChartData(fetchedData),
    title: `${getCountryName(selectedLocation)} Unemployment Rate`,
    plotLines: majorEvents,
  });

  return (
    <div className="chart-container">
      <div className="chart">
        <HighchartsReact highcharts={Highcharts} options={oecdOptions} />
        <HighchartsReact highcharts={Highcharts} options={g7Options} />
        <HighchartsReact highcharts={Highcharts} options={EAOptions} />
        <HighchartsReact highcharts={Highcharts} options={EUOptions} />
      </div>
      <div className="chart">
        <HighchartsReact highcharts={Highcharts} options={detailedOptions} />
      </div>
    </div>
  );
};
