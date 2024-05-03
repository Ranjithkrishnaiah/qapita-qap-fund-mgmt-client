import React, { useState } from "react";
import { Layout } from "antd";
import { Header } from "../../components/common/Header";
import { Sidebar } from "../../components/common/Sidebar";
import { Topbar } from "../../components/common/Topbar";
import { firmProfileInterface } from "../../components/FirmProfileInfo/firmProfileInterface";
import { CaptableComponent } from "../../components/CapTable";
import { companyIdInterface } from "../../components/common/PortoFolioTopbar/companyIdInterface";
import { CapCards } from "../../components/CapTable/CapCards";

const { Content } = Layout;

export const Captable: React.FC = (props) => {
  const [collapseTrigger, setCollapseTrigger] = useState(false);
  const [firm, setFirm] = useState<firmProfileInterface | undefined>();
  const [companyName, setCompanyName] = useState<companyIdInterface>();

  return (
    <>
      <Layout className="main-section scrollbar">
        <Topbar firm={firm} setFirm={setFirm} />
        <Content className="site-layout-background">
          <CapCards />
          <CaptableComponent />
        </Content>
      </Layout>
    </>
  );
};
