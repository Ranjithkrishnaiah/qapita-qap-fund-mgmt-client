import React from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import { PortCo } from "../CompanyOverviewWidget/CompanyOverviewCards/Portfolio";
import { PortfolioComposition } from "../PortfolioComposition";
import { InvestmentWidget } from "../InvestmentWidget";
import { LineChartWidget } from "../LineChartWidget";
import { useState } from "react";
import { useContext } from "react";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import { useEffect } from "react";

export const FundDashboardWidgets = () => {
  type FundObject = {
    id: string;
    name: { brandName: string; legalName: string };
  };

  const [fundsData, setFundsData] = useState<FundObject[]>();
  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().getSidebarService();

  useEffect(() => {
    service.getSidebarCompanies().then((res: any) => setFundsData(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient]);

  return (
    <Row className="widgetsRow" justify="space-between" gutter={16}>
      <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
        <PortCo data={fundsData?.length} />
        <PortfolioComposition />
      </Col>
      <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
        <InvestmentWidget />
      </Col>
      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
        <LineChartWidget />
      </Col>
    </Row>
  );
};
