import React, { ReactElement } from "react";
import "../FairValue/fairValue.scss";

type currency = {
  code: string;
};

type GainLossCardProps = {
  data: { amount: number; currency: currency } | undefined;
};

export const GainLoss = ({ data }: GainLossCardProps): ReactElement => {
  return (
    <div className="wrapperChildWhite">
      <p className="wrapperChildWhite__title">Gain/Loss</p>
      <h3 className="wrapperChildWhite__value">
        <span className="wrapperChildWhite__usd">{data?.currency}</span>{" "}
        {data?.amount.toLocaleString()}
      </h3>
    </div>
  );
};
