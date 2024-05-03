import React, { useState } from "react";
import "./manageRolesTab.scss";
import { Tabs } from "antd";
import { PredefinedRolesButtons } from "./PredefinedRolesButton";
import { FirmAdminRole } from "./PredefinedRoles/FirmAdminRole";
import { CustomRoles } from "./CustomRoles";
import { FundAdminRole } from "./PredefinedRoles/FundAdminRole";

const { TabPane } = Tabs;

export const ManageRolesTabs = () => {
  const [roleType, setRoleType] = React.useState("FIRM-ADMIN");

  return (
    <Tabs defaultActiveKey="tab1">
      <TabPane tab="Predefined Roles" key="tab1" className="tabPane">
        <PredefinedRolesButtons setRoleType={setRoleType} />
        {roleType === "FIRM-ADMIN" && <FirmAdminRole />}
        {roleType === "FUND-ADMIN" && <FundAdminRole />}
      </TabPane>
      <TabPane tab="Custom Roles" key="tab2" className="tabPane">
        <CustomRoles />
      </TabPane>
    </Tabs>
  );
};
