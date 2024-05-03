import React, { ReactElement, useState } from "react";
import "./fundWidget.scss";
import { Row, Col, Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { FundCard } from "./FundCard";
import { AddFundModal } from "./AddFundModal";
import { addFundInterface } from "./AddFundModal/AddFundModalInterface";

export const FundWidget = (): ReactElement => {
  const [visible, setVisible] = useState(false);
  const [fund, setFund] = useState<addFundInterface | undefined>();

  return (
    <div className="fundWidgetWrapper">
      <Row
        justify="space-between"
        align="middle"
        className="fundWidgetHeadingWrapper"
      >
        <Col>
          <h3 className="fundheading">Funds</h3>
        </Col>
        <Col>
          <Button
            className="addFundBtn"
            icon={<PlusCircleFilled />}
            onClick={() => setVisible(true)}
          >
            Add Fund
          </Button>
          <AddFundModal
            visible={visible}
            setVisible={setVisible}
            fund={fund}
            setFund={setFund}
          />
        </Col>
      </Row>
      <div className="fundCardsContainer">
        <FundCard />
      </div>
    </div>
  );
};
