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
import SparkLineTable from "../../components/Unemployment/SparkLine/SparklineTable";
import SparkLine from "../../components/Unemployment/SparkLine/Sparkline";
import { SparklineChart } from "../../components/Unemployment/SparkLine";
import { CovidChart } from "./CovidChart";

const UNEMPLOYMENT_URL = "http://127.0.0.1:5000/unemployment/all";
// "https://vgexf4h4u8.execute-api.ap-northeast-2.amazonaws.com/beta/unemployment_rate";
const COVID_URL = "http://127.0.0.1:5000/covid/confirmed_cases";

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
  const [covidData, setCovidData] = useState([]);

  // whether chart finished loading
  const [loaded, setLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("OECD");

  useEffect(() => {
    fetchChartData();
    fetchMajorEvents();
  }, []);

  const fetchChartData = () => {
    fetch(`${UNEMPLOYMENT_URL}`)
      .then((response) => {
        return response.body;
      })
      .then((rb) => {
        const reader = rb.getReader();

        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                push();
              });
            }
            push();
          },
        });
      })
      .then((stream) => {
        return new Response(stream, {
          headers: { "Content-Type": "text/html" },
        }).text();
      })
      .then((result) => {
        const json = JSON.parse(result);
        setFetchedData(json.body);
      });
  };

  const fetchCovidData = (iso = "kor") => {
    axios
      .get(`${COVID_URL}`, { params: { iso: iso } })
      .then((response) => {
        console.log("\n=====covid");
        console.log(response.body);
        return response.body;
      })
      .then((rb) => {
        const reader = rb.getReader();

        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                push();
              });
            }
            push();
          },
        });
      })
      .then((stream) => {
        return new Response(stream, {
          headers: { "Content-Type": "text/html" },
        }).text();
      })
      .then((result) => {
        const json = JSON.parse(result);
        // console.log(JSON.parse(result));
        // setCovidData(json.body);
      });
  };

  // const fetchChartData = React.useCallback(() => {
  //   axios
  //     .get(`${UNEMPLOYMENT_URL}`)
  //     .then((response) => {
  //       console.log("Successfully fetched unemployment chart data!\n");
  //       console.log(response);
  //       return response.data;
  //     })
  //     .then(({ body }) => {
  //       console.log(JSON.parse(body));
  //       const data = body;
  //       setFetchedData(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setLoaded(true);
  //     });
  // }, []);

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

  const onSelectLocation = (location) => {
    setSelectedLocation(location);
    fetchCovidData(location);
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
        <SparklineChart chartData={fetchedData} onClick={onSelectLocation} />
      </div>
      <div className="chart">
        {/* <CovidChart covidData={covidData} /> */}
        <HighchartsReact highcharts={Highcharts} options={detailedOptions} />
        <HighchartsReact highcharts={Highcharts} options={oecdOptions} />
        <HighchartsReact highcharts={Highcharts} options={g7Options} />
        <HighchartsReact highcharts={Highcharts} options={EAOptions} />
        <HighchartsReact highcharts={Highcharts} options={EUOptions} />
      </div>
    </div>
  );
};
