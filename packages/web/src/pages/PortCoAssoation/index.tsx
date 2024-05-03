import React, { useState, useEffect } from "react";
import "./portcoAssociation.scss";
import { Layout } from "antd";
import { Header } from "../../components/common/Header";
import { Sidebar } from "../../components/common/Sidebar";
import { Topbar } from "../../components/common/Topbar";
import { firmProfileInterface } from "../../components/FirmProfileInfo/firmProfileInterface";
import { ProtCoAsscoiation } from "../../components/PortCoAssociation";
import { companyIdInterface } from "../../components/common/PortoFolioTopbar/companyIdInterface";

const { Content } = Layout;

export const ProtCoAssociation: React.FC = (props) => {
  const [collapseTrigger, setCollapseTrigger] = useState(false);
  const [firm, setFirm] = useState<firmProfileInterface | undefined>();
  const [companyName, setCompanyName] = useState<companyIdInterface>();

  return (
    <>
      <Layout className="main-section scrollbar">
        <Topbar firm={firm} setFirm={setFirm} />
        <Content className="site-layout-background">
          <div className="metaTags__Container">
            <ProtCoAsscoiation />
          </div>
        </Content>
      </Layout>
    </>
  );
};
