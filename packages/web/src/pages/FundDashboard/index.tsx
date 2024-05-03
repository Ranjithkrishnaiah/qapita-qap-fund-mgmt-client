import React, { useState } from "react";
import { Layout } from "antd";
import { Header } from "../../components/common/Header";
import { Sidebar } from "../../components/common/Sidebar";
import { Topbar } from "../../components/common/Topbar";
import { firmProfileInterface } from "../../components/FirmProfileInfo/firmProfileInterface";
import { FundDashboardWidgets } from "../../components/Widgets/FundDashboardWidgets";
import { companyIdInterface } from "../../components/common/PortoFolioTopbar/companyIdInterface";

const { Content } = Layout;

export const FundDashboard = () => {
  const [collapseTrigger, setCollapseTrigger] = useState(false);
  const [firm, setFirm] = useState<firmProfileInterface | undefined>();
  const [companyName, setCompanyName] = useState<companyIdInterface>();
  return (
    <>
      <Layout className="main-section scrollbar">
        <Topbar firm={firm} setFirm={setFirm} />
        <Content className="site-layout-background">
          <FundDashboardWidgets />
        </Content>
      </Layout>
    </>
  );
};
