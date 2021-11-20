import React from "react";
import { LineChart } from "../../components/Charts/Line";

/**
 * Unemployment chart view for COVID dashboard
 * @param {} props
 * @returns
 */
export const Unemployment = (props) => {
  return (
    <div>
      <h1>Unemployment</h1>
      <LineChart />
    </div>
  );
};
