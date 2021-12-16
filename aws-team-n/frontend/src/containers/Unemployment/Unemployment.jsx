import "./Unemployment.css";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useLineChart } from "../../components/Unemployment/LineChart/useLineChart";
import {
  EACountries,
  EUCountries,
  g7Countries,
  getCountryName,
} from "../../components/Unemployment/countries";
import SparkLineTable from "../../components/Unemployment/SparkLine/SparklineTable";
import SparkLine from "../../components/Unemployment/SparkLine/Sparkline";
import { SparklineChart } from "../../components/Unemployment/SparkLine";
import { BubbleChart } from "../../components/Unemployment/BubbleChart/BubbleChart";
import { fetchData } from "../../components/Unemployment/fetchData";

const UNEMPLOYMENT_URL = "http://127.0.0.1:5000/unemployment/all";

const YOUTH_UNEMPLOYMENT_URL = "http://127.0.0.1:5000/unemployment/youth";

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
  const [youthUnemployment, setYouthUnemployment] = React.useState([]);

  useEffect(() => {
    fetchChartData();
    fetchYouthUnemployment();
    fetchMajorEvents();
  }, []);

  const fetchChartData = () => fetchData(UNEMPLOYMENT_URL, setFetchedData);

  const fetchYouthUnemployment = () =>
    fetchData(YOUTH_UNEMPLOYMENT_URL, setYouthUnemployment);

  const fetchMajorEvents = () => fetchData(MAJOR_EVENTS_URL, setMajorEvents);

  const getSecondaryChartData = () => {
    if (fetchedData.length > 0) {
      const targetLocation = fetchedData.find(
        (item) => item.location === selectedLocation,
      );
      if (targetLocation) return [targetLocation];
    }
    return [];
  };

  const onSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  const oecdOptions = useLineChart({
    chartData: fetchedData,
    title: "OECD Unemployment Rate",
    onSeriesClick: onSelectLocation,
    showLegend: true,
  });

  const g7Options = useLineChart({
    chartData: fetchedData?.filter(
      (item) => item.location === "G-7" || g7Countries.includes(item.location),
    ),
    title: "G-7 Unemployment Rate",
    onSeriesClick: onSelectLocation,
    onLegendItemClick: onSelectLocation,
    showLegend: true,
  });

  const EAOptions = useLineChart({
    chartData: fetchedData?.filter(
      (item) => item.location === "EA" || EACountries.includes(item.location),
    ),
    title: "Euro Area Unemployment Rate",
    onSeriesClick: onSelectLocation,
    onLegendItemClick: onSelectLocation,
    showLegend: true,
  });

  const EUOptions = useLineChart({
    chartData: fetchedData?.filter(
      (item) => item.location === "EU" || EUCountries.includes(item.location),
    ),
    title: "European Union Unemployment Rate",
    onSeriesClick: onSelectLocation,
    onLegendItemClick: onSelectLocation,
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
        <SparklineChart
          chartData={fetchedData}
          youthUnemployment={youthUnemployment}
          onClick={onSelectLocation}
        />
      </div>
      <div className="chart">
        <BubbleChart youthUnemployment={youthUnemployment} />
        <HighchartsReact highcharts={Highcharts} options={detailedOptions} />
        <HighchartsReact highcharts={Highcharts} options={oecdOptions} />
        <HighchartsReact highcharts={Highcharts} options={g7Options} />
        <HighchartsReact highcharts={Highcharts} options={EAOptions} />
        <HighchartsReact highcharts={Highcharts} options={EUOptions} />
      </div>
    </div>
  );
};
