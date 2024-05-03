import React, { ReactElement } from "react";
import Doughnut from "../../Charts/Doughnut";
import { Row, Col, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./portfolioComposition.scss";

const donutData = [
  { name: "MYS 7% (USD)", value: "19" },
  { name: "5-9", value: "29" },
  { name: "10-14", value: "19" },
];

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="https://www.antgroup.com">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://www.aliyun.com">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

export const PortfolioComposition = (): ReactElement => {
  return (
    <div className="portfolioCompositionWrapper">
      <Row justify="space-between">
        <Col>
          <h3 className="portcoHead">Portfolio Composition</h3>
          <h4 className="portcoSubhead">by Fair Value</h4>
        </Col>
        <Col>
          <Dropdown overlay={menu} trigger={["click"]} className="dropdown">
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Country <DownOutlined />
            </a>
          </Dropdown>
        </Col>
      </Row>

      {/* Chart Row */}
      <Row justify="center">
        <Col>
          <div className="doughNutWrapper" style={{ width: "250px" }}>
            <Doughnut data={donutData} />
          </div>
        </Col>
      </Row>
    </div>
  );
};
