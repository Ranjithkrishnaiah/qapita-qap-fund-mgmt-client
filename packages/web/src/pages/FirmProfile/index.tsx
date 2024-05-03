import React, { useState, useEffect } from "react";
import "./firmProfile.scss";
import { Layout } from "antd";
import { Widgets } from "../../components/Widgets";
import { Header } from "../../components/common/Header";
import { Sidebar } from "../../components/common/Sidebar";
import { Topbar } from "../../components/common/Topbar";
import { FirmProfileInfo } from "../../components/FirmProfileInfo";
import { firmProfileInterface } from "../../components/FirmProfileInfo/firmProfileInterface";
import { companyIdInterface } from "../../components/common/PortoFolioTopbar/companyIdInterface";

const { Content } = Layout;

export const FirmProfile: React.FC = (props) => {
  const [collapseTrigger, setCollapseTrigger] = useState(false);
  const [firm, setFirm] = useState<firmProfileInterface | undefined>();
  const [companyName, setCompanyName] = useState<companyIdInterface>();

  return (
    <>
      <Layout className="main-section scrollbar">
        <Topbar firm={firm} setFirm={setFirm} />
        <Content className="site-layout-background">
          <div className="firmProfileInfo_wrapper">
            <FirmProfileInfo />
          </div>
        </Content>
      </Layout>
    </>
  );
};
