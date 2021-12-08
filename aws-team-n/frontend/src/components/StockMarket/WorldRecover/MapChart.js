import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([1, 284])
  .range(["#ffedea", "#ff5233"]);

const MapChart = ({ setTooltipContent, setCountry }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(`/worldrecover.csv`).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <ComposableMap
      data-tip=""
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {data.length > 0 &&
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? colorScale(d["Start to Cover"]) : "#F5F4F6"}
                  onMouseEnter={() => {
                    const { NAME } = geo.properties;
                    if (d !== undefined && d["Start to Cover"] === '')
                      setTooltipContent(`${NAME} : CANNOT MEASURE (Economic downturn started before COVID)`);
                    else if (d !== undefined)
                      setTooltipContent(`${NAME} : ${d["Start to Cover"]} days`);
                    else
                      setTooltipContent("")
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  onClick={() => {
                    setCountry(geo.properties.NAME);
                  }}
                  style={{
                    hover: {
                      outline: "#000000",
                      outlineWidth: "3pt"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      }
    </ComposableMap>
  );
};

export default MapChart;