import React, { useEffect, useState } from "react";
import "./companyOverviewWidget.scss";
import { Row, Col } from "antd";
import { Funds } from "./CompanyOverviewCards/Funds";
import { PortCo } from "./CompanyOverviewCards/Portfolio";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import { useContext } from "react";
import axios from "axios";
import { ProtCoObject } from "../../PortCoAssociation/PortCoTableBody/ProtCoObject";

type PortCoTableBodyProps = {
  portCoData: ProtCoObject[];
  setPortCoData: (a: ProtCoObject[]) => void;
};

export const CompanyOverviewWidgets: React.FC = () => {
  type FundObject = {
    id: string;
    name: { brandName: string; legalName: string };
  };

  const [firmOverview, setFirmOverview] = useState<ProtCoObject[]>();
  const [fundsData, setFundsData] = useState<FundObject[]>();
  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().getSidebarService();

  useEffect(() => {
    service.getSidebarFunds().then((res: any) => setFirmOverview(res));

    service.getSidebarCompanies().then((res: any) => setFundsData(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient]);

  return (
    <Row
      gutter={{ xxl: 16, xl: 16, lg: 32, md: 32, sm: 32, xs: 16 }}
      justify="space-between"
    >
      <Col
        xxl={12}
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className="companyOverviewColumn gutterEightPixelRight"
      >
        <Funds data={firmOverview?.length} />
      </Col>

      <Col
        xxl={12}
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className="companyOverviewColumn gutterEightPixelLeft"
      >
        <PortCo data={fundsData?.length} />
      </Col>
    </Row>
  );
};
