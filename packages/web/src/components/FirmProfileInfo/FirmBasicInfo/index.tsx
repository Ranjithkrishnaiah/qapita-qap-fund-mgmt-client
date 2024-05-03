import { Col, Row } from "antd";
import React, { ReactElement } from "react";
import { firmProfileInterface } from "../firmProfileInterface";
import "./FirmBasicInfo.scss";

type FirmBasicInfoProps = {
  data: firmProfileInterface | undefined;
};

export const FirmBasicInfo = ({ data }: FirmBasicInfoProps): ReactElement => {
  return (
    <>
      <Row className="infoBlock__basicInfoRow">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <span>Legal Name</span>
          <h4>{data?.organizationName.legalName}</h4>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <span>Brand Name</span>
          <h4>{data?.organizationName.brandName}</h4>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <span>Country</span>
          <h4>{data?.incorporationDetails.country}</h4>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <span>Currency</span>
          <h4>{data?.reportingCurrency}</h4>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <span>Company Website</span>
          <h4>{data?.websiteUrl}</h4>
        </Col>
      </Row>
    </>
  );
};
