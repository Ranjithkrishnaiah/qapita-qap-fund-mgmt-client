import React, { useContext, useEffect, useState } from "react";
import { Layout } from "antd";
import { Header } from "../../components/common/Header";
import { Sidebar } from "../../components/common/Sidebar";
import { firmProfileInterface } from "../../components/FirmProfileInfo/firmProfileInterface";
import { FundDashboardWidgets } from "../../components/Widgets/FundDashboardWidgets";
import "./PortFolio.scss";
import { Divider } from "antd";
import Img from "../../../assets/images/tomato.svg";
import { PortFolioTopbar } from "../../components/common/PortoFolioTopbar";
import { Documents } from "../../components/PortfolioComapnyUser";
import { companyIdInterface } from "../../components/common/PortoFolioTopbar/companyIdInterface";
import { ApplicationContext } from "../../Context/ApplicationContext/ApplicationContextProvider";
const { Content } = Layout;

import { useParams } from "react-router";

type DocumentsProps = {
  routes;
  setRoutes: (a: any[]) => void;
  portCoData: any[];
  setPortCoData: (a: []) => void;
};

export const PortfolioCompany: React.FC<DocumentsProps> = ({
  routes,
  setRoutes,
  portCoData,
  setPortCoData,
}) => {
  const [collapseTrigger, setCollapseTrigger] = useState(false);
  const [companyName, setCompanyName] = useState<companyIdInterface>();
  const [firm, setFirm] = useState<firmProfileInterface | undefined>();
  const { slugId, getClient } = useContext(ApplicationContext);

  const service = getClient().getSidebarService();

  return (
    <>
      <Layout className="main-section scrollbar">
        <PortFolioTopbar
          companyName={companyName}
          setCompanyName={setCompanyName}
        />
        <Content className="site-layout-background">
          <Documents
            routes={routes}
            setRoutes={setRoutes}
            portCoData={portCoData}
            setPortCoData={setPortCoData}
          />
        </Content>
      </Layout>
    </>
  );
};
