import React, { ReactElement } from "react";
import "./fairValue.scss";

type currency = {
  code: string;
};

type FairValueCardProps = {
  data: { amount: number; currency: currency } | undefined;
};

export const FairValue = ({ data }: FairValueCardProps): ReactElement => {
  return (
    <div className="wrapperChildWhite">
      <p className="wrapperChildWhite__title">Fair Value of Investments</p>
      <h3 className="wrapperChildWhite__value">
        <span className="wrapperChildWhite__usd">{data?.currency}</span>{" "}
        {data?.amount.toLocaleString()}
      </h3>
    </div>
  );
};
