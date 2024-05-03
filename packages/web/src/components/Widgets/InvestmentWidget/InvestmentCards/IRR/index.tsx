import React, { ReactElement } from "react";
import "../FairValue/fairValue.scss";

type IrrCardProps = {
  data: number | undefined;
};

export const IRR = ({ data }: IrrCardProps): ReactElement => {
  return (
    <div className="wrapperChildWhite">
      <p className="wrapperChildWhite__title">IRR%</p>
      <h3 className="wrapperChildWhite__value">{data}</h3>
    </div>
  );
};
