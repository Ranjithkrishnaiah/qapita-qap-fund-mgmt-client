import React, { ReactElement } from "react";
import "./portfolioCard.scss";

type PortCoCardProps = {
  data: number | undefined;
};

export const PortCo = ({ data }: PortCoCardProps): ReactElement => {
  return (
    <div className="wrapperChildWhite">
      <p className="wrapperChildWhite__title">Portfolio Companies</p>
      <h3 className="wrapperChildWhite__value">{data}</h3>
    </div>
  );
};
