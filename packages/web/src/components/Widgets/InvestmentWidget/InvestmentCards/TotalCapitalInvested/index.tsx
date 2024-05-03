import React, { ReactElement } from "react";
import "./totalCapital.scss";

type currency = {
  code: string;
};

type InvestementCardProps = {
  data: { amount: number; currency: currency } | undefined;
};

export const TotalCapitalInvested = ({
  data,
}: InvestementCardProps): ReactElement => {
  return (
    <div
      className="wrapperChildGold"
      style={{ backgroundColor: "#ffce5e", border: "1px solid #ffce5e" }}
    >
      <p className="wrapperChildGold__title">Capital Invested</p>
      <h3 className="wrapperChildGold__value">
        <span className="wrapperChildGold__usd">{data?.currency}</span>{" "}
        {data?.amount.toLocaleString()}
      </h3>
    </div>
  );
};
