import React from "react";

import { useDraw } from "./useDraw";
import { LineChartContainer } from "./LineChartContainer";

export const LineChart = (props) => {
  const { width, height } = props;
  const [ref] = useDraw(props);

  return <LineChartContainer width={width} height={height} ref={ref} />;
};

LineChart.defaultProps = {
  width: 1000,
  height: 300,
  data: [23, 110, 231, -11, 122, 321, 90, 222, 78, 376],
  labels: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
  colors: ["#4682B4"],
};
