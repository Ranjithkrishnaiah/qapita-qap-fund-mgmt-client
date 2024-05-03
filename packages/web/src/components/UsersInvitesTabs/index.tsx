import React, { useContext, useEffect, useState } from "react";
import { Tabs, Layout, Pagination } from "antd";
import { Users } from "./Users/Users";
import { PendingInvites } from "./PendingInvites/PendingInvites";
import { Header } from "../../components/common/Header";
import { Sidebar } from "../../components/common/Sidebar";
import { Topbar } from "../../components/common/Topbar";
import { firmProfileInterface } from "../FirmProfileInfo/firmProfileInterface";
import { ApplicationContext } from "../../Context/ApplicationContext/ApplicationContextProvider";
import { Role } from "../../pages/ManageUsers";
import { companyIdInterface } from "../common/PortoFolioTopbar/companyIdInterface";

const { TabPane } = Tabs;
const { Content } = Layout;

export type RolesOptions = {
  label: string;
  value: string;
};

export const UsersAndInviteTabs = () => {
  const [collapseTrigger, setCollapseTrigger] = useState(false);
  const [firm, setFirm] = useState<firmProfileInterface | undefined>();
  const [roles, setRoles] = useState<Role[]>([]);
  const [totalResult, setTotalResult] = useState(0);
  const [rolesOptions, setRolesOptions] = useState<RolesOptions[]>([]);
  const { getClient } = useContext(ApplicationContext);
  const client = getClient().getRolesService();
  const [companyName, setCompanyName] = useState<companyIdInterface>();

  useEffect(() => {
    //getting roles
    client.getRoles().then((response) => setRoles(response));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getClient]);

  useEffect(() => {
    type Payload = {
      label: string;
      value: string;
    };
    const rolesArr: Payload[] = [];

    roles?.map((role) => {
      const payload = { label: "", value: "" };
      payload.label = role.name;
      payload.value = role.roleId;
      rolesArr.push(payload);
    });
    setRolesOptions(rolesArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles]);

  return (
    // <Layout>
    //   <Header
    //     collapseTrigger={collapseTrigger}
    //     setCollapseTrigger={setCollapseTrigger}
    //     firm={firm}
    //     setFirm={setFirm}
    //   />
    //   <Layout>
    //     <Sidebar
    //       collapseTrigger={collapseTrigger}
    //       setCollapseTrigger={setCollapseTrigger}
    //       companyName={companyName}
    //       setCompanyName={setCompanyName}
    //     />
    <Layout className="main-section scrollbar">
      <Topbar firm={firm} setFirm={setFirm} />
      <Content className="site-layout-background">
        <Tabs defaultActiveKey="tab1">
          <TabPane tab="Users" key="tab1">
            <Users
              roles={roles}
              setRoles={setRoles}
              totalResult={totalResult}
              setTotalResult={setTotalResult}
              rolesOptions={rolesOptions}
            />
          </TabPane>
          <TabPane tab="Pending Invitations" key="tab2">
            <PendingInvites
              roles={roles}
              setRoles={setRoles}
              totalResult={totalResult}
              setTotalResult={setTotalResult}
              rolesOptions={rolesOptions}
            />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
    //   </Layout>
    // </Layout>
  );
};
