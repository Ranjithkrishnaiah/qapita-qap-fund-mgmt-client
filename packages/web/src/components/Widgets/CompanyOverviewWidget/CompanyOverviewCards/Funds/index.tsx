import React, { ReactElement } from "react";
import "../Portfolio/portfolioCard.scss";
import { DoubleRightOutlined } from "@ant-design/icons";

type FundCardProps = {
  data: number | undefined;
};

export const Funds = ({ data }: FundCardProps): ReactElement => {
  return (
    <div className="wrapperChildWhite">
      <div className="fundsIconCont">
        <DoubleRightOutlined />
      </div>
      <p className="wrapperChildWhite__title">Funds</p>
      <h3 className="wrapperChildWhite__value">{data}</h3>
    </div>
  );
};
