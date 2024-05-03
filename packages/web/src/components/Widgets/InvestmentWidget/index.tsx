import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import "./investmentWidget.scss";
import { DoubleRightOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { TotalCapitalInvested } from "./InvestmentCards/TotalCapitalInvested";
import { FairValue } from "./InvestmentCards/FairValue";
import { GainLoss } from "./InvestmentCards/GainLoss";
import { RealizedValue } from "./InvestmentCards/RealizedValue";
import { Multiple } from "./InvestmentCards/Multiple";
import { useContext } from "react";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";

export const InvestmentWidget = (): ReactElement => {
  interface InvestmentInterface {
    totalCapitalInvested: { amount: number; currency: { code: string } };
    fairValue: { amount: number; currency: { code: string } };
    profit: { amount: number; currency: { code: string } };
    realizedValue: { amount: number; currency: { code: string } };
    multiple: number;
    irr: number;
  }

  const [investmentData, setInvestmentData] = useState<InvestmentInterface>();
  const { slugId, getClient } = useContext(ApplicationContext);
  const client = getClient().getFirmDashboardService();

  useEffect(() => {
    client
      .getFirmDashboardStats()
      .then((res: any) => setInvestmentData(res.investmentSummary));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient]);

  return (
    <div className="investmentWidgetsWrapper">
      <Row justify="space-around" className="investmentWrapper">
        <Col span={12} className="investmentTitleIcon investmentTitle">
          Investments
        </Col>
        <Col span={12} className="investmentTitleIcon">
          <div className="investmentIconCont">
            <DoubleRightOutlined className="investmentIcon" />
          </div>
        </Col>
      </Row>
      <Row justify="space-around" gutter={16}>
        {/* Fair Value */}
        <Col
          xxl={24}
          xl={24}
          lg={24}
          md={12}
          sm={12}
          xs={12}
          className="investmentCards"
        >
          <FairValue data={investmentData?.fairValue} />
        </Col>

        {/* Capital Invested */}
        <Col
          xxl={12}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className="investmentCards gutterEightPixelRight"
        >
          <TotalCapitalInvested data={investmentData?.totalCapitalInvested} />
        </Col>

        {/* Multiple */}
        <Col
          xxl={12}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className="investmentCards gutterEightPixelLeft"
        >
          <Multiple data={investmentData?.multiple} />
        </Col>

        {/* Gain/Loss */}
        <Col
          xxl={12}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className="investmentCards gutterEightPixelRight"
        >
          <GainLoss data={investmentData?.profit} />
        </Col>

        {/* Realized Value */}
        <Col
          xxl={12}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className="investmentCards gutterEightPixelLeft"
        >
          <RealizedValue data={investmentData?.realizedValue} />
        </Col>
      </Row>
    </div>
  );
};
