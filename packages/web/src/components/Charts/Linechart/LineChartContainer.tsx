import React from "react";
import "./LineStyles.css";

type LineChartContainerProps = {
  width: string;
  height: string;
};

// eslint-disable-next-line react/display-name
export const LineChartContainer = React.forwardRef(
  ({ width, height }: LineChartContainerProps, ref: any) => {
    return <div ref={ref} style={{ maxWidth: width, height: height }}></div>;
  }
);
