import React from "react";
import "./capCards.scss";
import { Row, Col, Card, Statistic } from "antd";

export const CapCards = () => {
  const prefixCurrency = () => <span className="capPrefixCurrency">USD</span>;

  return (
    <Row justify="space-between" gutter={16} className="capCardsRow">
      <Col span={4}>
        <Card className="capCard">
          <p className="capHeading">Stakeholders</p>
          <Statistic value={20} className="capContent" />
        </Card>
      </Col>

      <Col span={8}>
        <Card className="capCard">
          <p className="capHeading">Fully Diluted Shares</p>
          <Statistic
            value={5422034}
            prefix={prefixCurrency()}
            className="capContent"
          />
        </Card>
      </Col>

      <Col span={8}>
        <Card className="capCard">
          <p className="capHeading">Primary Amt Invested </p>
          <Statistic
            value={7521974}
            prefix={prefixCurrency()}
            className="capContent"
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card className="capCard">
          <p className="capHeading">Ownership</p>
          <Statistic value={100} className="capContent" suffix="%" />
        </Card>
      </Col>
    </Row>
  );
};
