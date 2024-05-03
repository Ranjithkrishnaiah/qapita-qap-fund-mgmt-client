import React, { ReactElement } from "react";
import Doughnut from "../../Charts/Doughnut";
import { Row, Col, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./portfolioinvestment.scss";

export const PortfolioInvestment = (): ReactElement => {
  return (
    <div className="portfolioInvestmentWrapper">
      <Row justify="space-between">
        <Col>
          <h3 className="portinHead">Portfolio investment and value history</h3>
        </Col>
      </Row>

      {/* Chart Row */}
      <Row justify="center">
        <Col>
          <div className="doughNutWrapper" style={{ width: "250px" }}></div>
        </Col>
      </Row>
    </div>
  );
};
