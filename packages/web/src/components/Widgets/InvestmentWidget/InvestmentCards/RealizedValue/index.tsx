import React, { ReactElement } from "react";
import "../FairValue/fairValue.scss";

type currency = {
  code: string;
};

type RealizedValueCardProps = {
  data: { amount: number; currency: currency } | undefined;
};

export const RealizedValue = ({
  data,
}: RealizedValueCardProps): ReactElement => {
  return (
    <div className="wrapperChildWhite">
      <p className="wrapperChildWhite__title">Realized Value</p>
      <h3 className="wrapperChildWhite__value">
        <span className="wrapperChildWhite__usd">{data?.currency}</span>{" "}
        {data?.amount.toLocaleString()}
      </h3>
    </div>
  );
};
