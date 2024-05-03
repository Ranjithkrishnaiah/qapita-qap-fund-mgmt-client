import React from "react";
import "./topbar.scss";
import { Breadcrumb, Row, Col, Space, Divider } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import { NavLink } from "react-router-dom";
import { firmProfileInterface } from "../../FirmProfileInfo/firmProfileInterface";

interface TopBarProps {
  firm: firmProfileInterface | undefined;
  setFirm: (a: firmProfileInterface | undefined) => void;
}

export const Topbar: React.FC<TopBarProps> = ({ firm, setFirm }) => {
  const [firmlogo, setFirmLogo] = useState();
  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().getHeaderService();

  useEffect(() => {
    service.getLogo().then((res: any) => setFirmLogo(res));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient]);

  return (
    <Row align="middle" justify="space-between" className="topBarWrapper">
      <Col>
        <Space
          split={
            <Divider
              type="vertical"
              style={{
                borderColor: "lightGray",
                height: "35px",
                borderWidth: 1.5,
              }}
            />
          }
        >
          <h1 className="dashboardTitle">
            {location.pathname.split("/")[3] === undefined ? (
              <div>{location.pathname.split("/")[2]}</div>
            ) : (
              <div>{location.pathname.split("/")[3]}</div>
            )}
          </h1>
          <div className="companyInfo">
            <div className="logoWrapper">
              <img src={firmlogo} />
            </div>
            {firm?.organizationName.brandName === "" ? (
              <h3 className="companyName">
                {firm?.organizationName.legalName}
              </h3>
            ) : (
              <h3 className="companyName">
                {firm?.organizationName.brandName}
              </h3>
            )}
          </div>
        </Space>
      </Col>
      <Col>
        <Breadcrumb>
          <Breadcrumb.Item className="breadcrumbItem">
            <NavLink to={`/${slugId}/dashboard`}>Dashboard</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcrumbItem">
            {location.pathname.split("/")[2]}
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcrumbItem">
            {location.pathname.split("/")[3]}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>
    </Row>
  );
};
