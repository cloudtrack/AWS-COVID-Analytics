const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;
const START_DATE = 1577836800; // 2020/01/01
const NUM = 50;

/**
 * @param {*} timestamp
 * @returns Date string in "Month YYY" format
 */
export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

/**
 * Generate random test data with n points between range 0~50
 */
export const generateRandomData = () => {
  const dates = [...Array(NUM)].map((item, i) => START_DATE + i * ONE_YEAR);
  return [...Array(NUM)].map((item, i) => [dates[i], Math.random() * NUM]);
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

const getTimestampFromDate = (dateStr) => {
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
    const chartData = item.data.map((dataItem) => {
      const timestamp = getTimestampFromDate(dataItem.time);
      return [timestamp, parseFloat(dataItem.value)];
    });

    return {
      name: item.location,
      data: chartData,
      // type: "area",
      lineWidth: 2,
      fillColor: "transparent",
    };
  });
};

/**
 * Generate plotlines options array from given plotline data
 */
export const parsePlotLines = (plotLines) => {
  return plotLines.map((item) => {
    const timestamp = Date.parse(item.date);
    return {
      ////
      color: "orange",
      value: timestamp,
      width: 2,
      dashStyle: "solid",
      label: {
        text: `${item.name}<br/>${formatDate(timestamp)}`,
        x: 0,
        y: -10,
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
};
