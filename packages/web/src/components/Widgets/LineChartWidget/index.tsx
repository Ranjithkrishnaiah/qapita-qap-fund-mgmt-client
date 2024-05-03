import React, { ReactElement } from "react";
import { LineChart } from "../../Charts/Linechart";
import "./lineChartWidget.scss";

export const LineChartWidget = () => {
  return (
    <div className="lineChartWidgetWrapper">
      <p className="lineChartHeading">Porfolio investment and value history</p>
      <div className="lineChartContainer">
        <div className="lineChartAxisLabelCont">
          <div className="lineChartAxisLabel">
            <p>Values (USD)</p>
          </div>
        </div>
        <div className="lineChartPlot">
          <LineChart />
        </div>
      </div>
    </div>
  );
};
