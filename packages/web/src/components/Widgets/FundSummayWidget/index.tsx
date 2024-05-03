import React, { useContext, useEffect, useState } from "react";
import "./fundSummayWidget.scss";
import data from "../userData.json";
import { Row, Col } from "antd";
import { FundSummayCard } from "./FundSummayCard";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";

export const FundSummayWidget: React.FC = () => {
  const [fundSummary, setFundSummary] = useState([]);
  const { getClient } = useContext(ApplicationContext);
  const service = getClient().InvestmentCompaniesTableService();

  useEffect(() => {
    service.getInvestmentSummaryData().then((response: any) => {
      setFundSummary(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getClient]);

  return (
    <>
      <div className="fundSummaryCardWrapper">
        <Row justify="space-around">
          {fundSummary.map((el: any, index) => (
            <Col
              key={index}
              xxl={24}
              xl={24}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              className="companyOverviewColumn"
            >
              <FundSummayCard data={el} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
