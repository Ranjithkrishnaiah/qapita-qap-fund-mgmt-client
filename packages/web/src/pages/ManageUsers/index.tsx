import React, { ReactElement, useState } from "react";
import "./manageUsers.scss";
import { Layout } from "antd";
import { Header } from "../../components/common/Header";
import { Sidebar } from "../../components/common/Sidebar";
import { Topbar } from "../../components/common/Topbar";
import { InvitesTable } from "../../components/PendingInvitesTable";
// import { UserButtonCollection } from "../../components/PendingInvitesTable/InvitesButtonCollection";
import { firmProfileInterface } from "../../components/FirmProfileInfo/firmProfileInterface";
import { companyIdInterface } from "../../components/common/PortoFolioTopbar/companyIdInterface";

const { Content } = Layout;

export interface UserRole {
  roleId: string;
  name: string;
}

export interface Role {
  roleId: string;
  name: string;
  description: string;
}

export interface ReminderArray {
  slugId: string;
  invitationId: string;
}

export interface User {
  userInvitationId: string;
  userInvitationStatus: {
    value: string;
  };
  userId: string;
  version: number | null;
  firstName: string;
  lastName: string;
  email: string;
  userRoles: UserRole[];
  roles: string[];
}

export const ManageUsers: React.FC = () => {
  const [collapseTrigger, setCollapseTrigger] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [reminderArray, setReminderArray] = useState<ReminderArray[]>([]);
  const [isReminded, setIsReminded] = useState(false);
  const [firm, setFirm] = useState<firmProfileInterface | undefined>();
  const [checkAll, setCheckAll] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);
  const ITEMS_PER_PAGE = 5;
  const [statusList, setStatusList] = useState<string[]>([]);
  const [roleList, setRoleList] = useState<string[]>([]);
  const [companyName, setCompanyName] = useState<companyIdInterface>();

  return (
    <Layout className="main-section scrollbar">
      <Topbar firm={firm} setFirm={setFirm} />
      <Content className="site-layout-background">
        {/* <UserButtonCollection
              users={users}
              setUsers={setUsers}
              reminderArray={reminderArray}
              setIsReminded={setIsReminded}
              setCheckAll={setCheckAll}
              roles={roles}
              setRoles={setRoles}
              page={page}
              setTotalResult={setTotalResult}
              itemsPerPage={ITEMS_PER_PAGE}
              statusList={statusList}
              setStatusList={setStatusList}
              roleList={roleList}
              setRoleList={setRoleList}
            /> */}
        <div className="companiesTable_block">
          {/* <InvitesTable
                users={users}
                setUsers={setUsers}
                reminderArray={reminderArray}
                setReminderArray={setReminderArray}
                isReminded={isReminded}
                setIsReminded={setIsReminded}
                setCheckAll={setCheckAll}
                checkAll={checkAll}
                roles={roles}
                setRoles={setRoles}
                page={page}
                setPage={setPage}
                totalResult={totalResult}
                setTotalResult={setTotalResult}
                itemsPerPage={ITEMS_PER_PAGE}
                statusList={statusList}
                roleList={roleList}
              /> */}
        </div>
      </Content>
    </Layout>
  );
};
