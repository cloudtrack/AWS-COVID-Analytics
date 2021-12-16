/**
 * @param {*} timestamp
 * @returns Date string in "Month YYY" format
 */
export const formatDate = (timestamp, showMonth = true) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: showMonth ? "short" : undefined,
    year: "numeric",
  });
};

/**
 * Replace Quarter number with first month of respective period.
 * Q1 First Quarter: January 1st – March 31st
 * Q2 Second Quarter: April 1st – June 30th
 * Q3 Thirst Quarter: July 1st – September 30th
 * Q4 Fourth Quarter: October 1st – December 31st
 */
const getMonthFromQuarter = (i) => {
  if (i < 1 || i > 4) return "";
  const month = (i - 1) * 3 + 1;
  // Return month string with two integer digits
  return month.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

export const getTimestampFromDate = (dateStr) => {
  const pos = dateStr.indexOf("Q");

  if (pos === -1) {
    return Date.parse(dateStr);
  }

  const quarter = parseInt(dateStr.substr(pos + 1));
  const cleanedStr = dateStr.substr(0, pos) + getMonthFromQuarter(quarter);
  return Date.parse(cleanedStr);
};

/**
 * Generate series options array from given raw chart data
 */
export const parseChartData = (data) => {
  return data.map((item) => {
    const chartData = item.rates.map((dataItem, i) => {
      const timestamp = getTimestampFromDate(dataItem.time);
      // use moving average values and round off to two decimal places to smoothen data
      return [timestamp, +parseFloat(dataItem.moving_avg).toFixed(2)];
    });

    return {
      name: item.location,
      data: chartData,
      type: "spline",
      fillColor: "transparent",
      lineWidth: 2,
    };
  });
};

/**
 * Generate plotlines options array from given plotline data
 */
export const parsePlotLines = (plotLines) => {
  if (!plotLines) return null;

  const plotBands = plotLines.map((item) => {
    const timestamp = Date.parse(item.date);
    return {
      color: "#FFE5B4",
      value: timestamp,
      width: 5,
      dashStyle: "solid",
      label: {
        text: `${item.name}<br/>${formatDate(timestamp)}`,
        x: 0,
        y: -25,
        useHTML: true,
        textAlign: "center",
        rotation: 0,
        style: {
          backgroundColor: "grey",
          color: "white",
          padding: "4px 4px 4px 4px",
          fontWeight: "bold",
          borderRadius: "4px 4px 4px 4px",
          textAlign: "center",
          display: "none", // hide initially
        },
      },
      events: {
        // only display labels on mouse hover
        mouseover: function (e) {
          this.label.element.style.display = "block";
        },
        mouseout: function (e) {
          this.label.element.style.display = "none";
        },
      },
      zIndex: 1,
    };
  });

  const covidStartDate = Date.parse("2019-11-17");
  // add covid start data
  plotBands.push({
    color: "gray",
    value: covidStartDate,
    width: 1.5,
    dashStyle: "dash",
    label: {
      text: `COVID-19 Pandemic<br/>(17 November 2019)`,
      y: 15,
      useHTML: true,
      textAlign: "right",
      rotation: 0,
      style: {
        color: "gray",
        fontSize: "10px",
        fontWeight: "bold",
        textAlign: "right",
      },
    },
    zIndex: 1,
  });
  return plotBands;
};
