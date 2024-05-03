import React from "react";
import "./portcotopbar.scss";
import { Breadcrumb, Row, Col, Space, Divider } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import { NavLink } from "react-router-dom";
import { firmProfileInterface } from "../../FirmProfileInfo/firmProfileInterface";
import Img from "../../../../assets/images/tomato.svg";
import { useParams } from "react-router";
import { companyIdInterface } from "./companyIdInterface";

interface PortFolioTopbarProps {
  companyName: companyIdInterface | undefined;
  setCompanyName: (a: companyIdInterface | undefined) => void;
  companyId?: string;
}

interface params {
  id: string;
}

export const PortFolioTopbar: React.FC<PortFolioTopbarProps> = ({
  companyName,
  setCompanyName,
  companyId,
}) => {
  const { slugId, getClient } = useContext(ApplicationContext);
  // const service = getClient().getHeaderService();
  const [name, setName] = useState<companyIdInterface>();
  const service = getClient().getSidebarService();
  // const id;

  const params: params = useParams();
  const id: string | undefined = params.id;

  useEffect(() => {
    if (id) {
      service.getSidebarCompaniesId(id).then((res: any) => setName(res));
    } else if (companyId) {
      service.getSidebarCompaniesId(companyId).then((res: any) => setName(res));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient, id, companyId]);

  return (
    <Row align="middle" justify="space-between" className="topBarWrapper1">
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
          <h3 className="dashboardTitle">
            {location.pathname.split("/")[3] === undefined ? (
              <div>{location.pathname.split("/")[2]}</div>
            ) : (
              <div>{location.pathname.split("/")[3]}</div>
            )}
          </h3>

          <div className="companyInfo">
            {/* <div className="logoWrapper"></div>  For Logo Part  */}
            <h3 className="companyName1">{name?.legalName}</h3>
          </div>
        </Space>
      </Col>
      <Col>
        <Breadcrumb>
          <Breadcrumb.Item className="breadcrumbItem">
            <NavLink to={`/${slugId}/dashboard`}>Portfolio Company </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcrumbItem">
            {name?.legalName}
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcrumbItem">
            {location.pathname.split("/")[3]}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>
    </Row>
  );
};
