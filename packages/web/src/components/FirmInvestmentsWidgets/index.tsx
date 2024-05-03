/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from "react";
import "./firmInvestmentsWidgets.scss";
import { Row, Col } from "antd";
import { CompanyOverviewWidgets } from "../Widgets/CompanyOverviewWidget";
import { InvestmentWidget } from "../Widgets/InvestmentWidget";
import { FundSummayWidget } from "../Widgets/FundSummayWidget";
import { FundInvestmentWidget } from "../Widgets/FundInvestmentWidget";

// json data for dynamic dashboard
const data = [
  { id: "fundSummay", column: 1, row: 1 },
  { id: "fundInvestment", column: 2, row: 1 },
];

export const FirmInvestmentsWidgets: React.FC = () => {
  // function to dynamically load widets from json file
  function loadWidget(col: number, row = 1) {
    let requiredWidget = "";
    data.forEach((el) => {
      if (el.column === col && el.row === row) requiredWidget = el.id;
    });

    switch (requiredWidget) {
      case "fundSummay":
        return <FundSummayWidget />;
      case "fundInvestment":
        return <FundInvestmentWidget />;
      default:
        return null;
    }
  }

  return (
    <Row
      className="widgetsRow widgetsRowInvestmentFirm"
      justify="center"
      gutter={16}
    >
      <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
        {loadWidget(1, 1)}
      </Col>
      <Col xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
        {loadWidget(2, 1)}
      </Col>
    </Row>
  );
};
