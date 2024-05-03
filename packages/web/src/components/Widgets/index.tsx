/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from "react";
import "./widgets.scss";
import "antd/dist/antd.css";
import { CompanyOverviewWidgets } from "./CompanyOverviewWidget";
import { InvestmentWidget } from "./InvestmentWidget";
import { PortfolioComposition } from "./PortfolioComposition";
import { Row, Col } from "antd";
import { FundWidget } from "./FundsWidget";

// json data for dynamic dashboard
const data = [
  { id: "companyOverview", column: 1, row: 1 },
  { id: "portfolio", column: 1, row: 2 },
  { id: "investment", column: 2, row: 1 },
  { id: "fund", column: 3, row: 1 },
];

export const Widgets: React.FC = () => {
  // function to dynamically load widets from json file
  function loadWidget(col: number, row = 1) {
    let requiredWidget = "";
    data.forEach((el) => {
      if (el.column === col && el.row === row) requiredWidget = el.id;
    });
    // console.log(requiredWidget);
    switch (requiredWidget) {
      case "companyOverview":
        return <CompanyOverviewWidgets />;
      case "portfolio":
        return <PortfolioComposition />;
      case "investment":
        return <InvestmentWidget />;
      case "fund":
        return <FundWidget />;
      default:
        return null;
    }
  }
  return (
    <Row className="widgetsRow" justify="space-between" gutter={16}>
      <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
        {loadWidget(1, 1)}
        {loadWidget(1, 2)}
      </Col>
      <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
        {loadWidget(2, 1)}
      </Col>
      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
        {loadWidget(3, 1)}
      </Col>
    </Row>
  );
};
