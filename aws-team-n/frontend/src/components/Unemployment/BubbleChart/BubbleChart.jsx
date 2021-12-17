import React from "react";
import "./BubbleChart.css";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
import { fetchData } from "../fetchData";
HC_more(Highcharts);

const COVID_URL = `http://127.0.0.1:5000/unemployment/covid`;

export const BubbleChart = (props) => {
  const { youthUnemployment = [] } = props;
  const [covidData, setCovidData] = React.useState([]);

  const youthUnemploymentRate = [];
  for (let i = 0; i < youthUnemployment.length / 2; i++) {
    const idx = i * 2;
    const men = youthUnemployment[idx + 1].unemployment_rate;
    const women = youthUnemployment[idx].unemployment_rate;
    youthUnemploymentRate.push({
      iso: youthUnemployment[idx].location,
      women: women,
      men: men,
      total: women + men / 2,
    });
  }

  const oecdCountries = youthUnemployment.map((item) => item.location);
  const oecdYouthUnemployment = youthUnemployment.filter(
    (item) => item.location === "OECD",
  );
  const oecdRate =
    (oecdYouthUnemployment[0]?.unemployment_rate +
      oecdYouthUnemployment[1]?.unemployment_rate) /
      2 || 0;

  React.useEffect(() => {
    fetchCovidData();
  }, []);

  const fetchCovidData = () => fetchData(COVID_URL, setCovidData);

  const parseBubbleChartData = () => {
    // filter out oecd countries
    const filteredData = covidData.filter((item) =>
      oecdCountries.includes(item.iso),
    );
    if (!filteredData) return [];

    const parsedData = filteredData.map((item) => {
      const unemploymentDatum = youthUnemploymentRate.find(
        (yItem) => yItem.iso === item.iso,
      );
      const total = unemploymentDatum?.total || 0;
      return {
        x: total,
        y: item.total_cases,
        z: +(item.total_cases / 1000 / total).toFixed(4),
        name: item.iso,
        country: item.location,
      };
    });

    return parsedData;
  };

  parseBubbleChartData();

  return (
    <div>
      <h1 className="title">
        OECD Youth Unemployment Rate and Total COVID-19 Cases
      </h1>
      <HighchartsReact
        highcharts={Highcharts}
        options={getChartOptions(parseBubbleChartData(), oecdRate)}
      />
    </div>
  );
};

const getChartOptions = (data, oecdRate = 0) => {
  return {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
      zoomType: "xy",
      backgroundColor: "transparent",
    },
    credits: {
      enabled: false,
    },

    legend: {
      enabled: false,
    },

    title: {
      text: "Latest OECD youth unemployment rates and total coronavirus cases",
      style: {
        fontSize: "14px",
      },
    },

    subtitle: {
      text: 'Source: <a href="https://ourworldindata.org">OWID</a> and <a href="https://data.oecd.org/">OECD</a>',
    },

    accessibility: {
      point: {
        valueDescriptionFormat:
          "{index}. {point.name}, Youth unemployment: {point.x}, Total cases: {point.y}, Density: {point.z}k cases",
      },
    },

    xAxis: {
      gridLineWidth: 1,
      title: {
        text: "Youth Unemployment Rate",
      },
      labels: {
        format: "{value}",
      },
      plotLines: [
        {
          color: "gray",
          dashStyle: "dot",
          width: 2,
          value: oecdRate,
          label: {
            rotation: 0,
            y: 12,
            x: 5,
            textAlign: "left",
            style: {
              color: "gray",
              fontStyle: "italic",
            },
            text: "OECD youth unemployment rate",
          },
          zIndex: 3,
        },
      ],
    },
    yAxis: {
      startOnTick: false,
      endOnTick: false,
      title: {
        text: "Total COVID-19 Cases",
      },
      labels: {
        format: "{value}",
      },
      maxPadding: 0.2,
    },

    tooltip: {
      useHTML: true,
      headerFormat: "<table>",
      pointFormat:
        "<h3>{point.country}</h3>" +
        "Youth unemployment: {point.x}<br/>" +
        "Total cases: {point.y}<br/>" +
        "Density: {point.z}k cases",
      footerFormat: "</table>",
      followPointer: true,
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    },

    series: [
      {
        colorByPoint: true,
        data: data,
      },
    ],
  };
};
