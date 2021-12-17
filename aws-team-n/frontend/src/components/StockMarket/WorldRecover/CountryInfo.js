import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import "./CountryInfo.css";

const CountryInfo = ({ country }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(`/worldrecover.csv`).then((data) => {
      setData(data.find((s) => s.Name === country));
    });
  }, [country]);

  return (
    <div>
      <div className="title">{country}</div>
      {data === undefined ? (
        <div className="no-info">
          <p className="info-detail">No Content Available</p>
          <p className="info-detail">Choose a country marked with color.</p>
        </div>
      ) : (
        <div className="data">
          <div className="data-date">
            <div className="item">
              <div className="tag">Start of Fall Date</div>
              <div className="date">{data["Start Date"]}</div>
            </div>
            <div className="item">
              <div className="tag">Worst Date</div>
              <div className="date">{data["Min Date"]}</div>
            </div>
            <div className="item">
              <div className="tag">Recovered Date</div>
              <div className="date">{data["Cover Date"]}</div>
            </div>
          </div>
          <div className="data-day">
            <div className="item">
              <div className="tag">
                <p>Days from</p>
                <p>Start to Worst</p>
              </div>
              <div className="day">{data["Start to Min"]}</div>
            </div>
            <div className="item">
              <div className="tag">
                <p>Days from</p>
                <p>Worst to Recover</p>
              </div>
              <div className="day">{data["Min to Cover"]}</div>
            </div>
            <div className="item">
              <div className="tag">
                <p>Days from</p>
                <p>Start to Recover</p>
              </div>
              <div className="day">{data["Start to Cover"]}</div>
            </div>
          </div>
          <div className="info">
            <p className="info-detail">
              * 'Start of fall date' is the date 5-days-average has gone below
              240-days-average, also known as a 'dead cross'.
            </p>
            <p className="info-detail">
              * 'End of fall date' is the date 5-days-average has gone above
              240-days-average, also known as a 'golden cross'.{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default CountryInfo;
