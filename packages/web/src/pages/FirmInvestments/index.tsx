import React, { useState } from "react";
import "./firmInvestments.scss";
import { Layout } from "antd";
import { Header } from "../../components/common/Header";
import { Sidebar } from "../../components/common/Sidebar";
import { Topbar } from "../../components/common/Topbar";
import { FirmInvestmentsWidgets } from "../../components/FirmInvestmentsWidgets";
import { CompaniesTable } from "../../components/CompaniesTable";
import { firmProfileInterface } from "../../components/FirmProfileInfo/firmProfileInterface";
import { companyIdInterface } from "../../components/common/PortoFolioTopbar/companyIdInterface";

const { Content } = Layout;

export const Investments: React.FC = (props) => {
  const [collapseTrigger, setCollapseTrigger] = useState(false);
  const [firm, setFirm] = useState<firmProfileInterface | undefined>();
  const [companyName, setCompanyName] = useState<companyIdInterface>();

  return (
    <>
      <Layout className="main-section scrollbar">
        <Topbar firm={firm} setFirm={setFirm} />
        <Content className="site-layout-background">
          <div className="firmInvestmentsWidgets_block">
            <FirmInvestmentsWidgets />
          </div>

          <div className="companiesTable_block">
            <CompaniesTable />
          </div>
        </Content>
      </Layout>
    </>
  );
};
