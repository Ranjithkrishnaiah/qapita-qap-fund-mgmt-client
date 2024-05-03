import { Col, Row } from "antd";
import React, { ReactElement } from "react";
import { firmProfileInterface } from "../firmProfileInterface";
import "./FirmContactInfo.scss";

type FirmContactInfoProps = {
  data: firmProfileInterface | undefined;
};

export const FirmContactInfo = ({
  data,
}: FirmContactInfoProps): ReactElement => {
  return (
    <>
      <Row className="infoBlock__basicInfoRow">
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <span>Name</span>
          <h4>{data?.contactPerson}</h4>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <span>Phone</span>
          <h4>{data?.contactNumber}</h4>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <span>Email</span>
          <h4>{data?.emailId}</h4>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <span>Address</span>
          <h4>{data?.incorporationDetails.address}</h4>
        </Col>
      </Row>
    </>
  );
};
