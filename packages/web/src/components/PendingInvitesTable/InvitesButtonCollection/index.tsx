import React, { ReactElement, useState, useEffect, useContext } from "react";
import "./inviteBtnCollection.scss";
import axios from "axios";
import { ReminderButton } from "../InvitesTableButtons/ReminderBtn";
import { Row, Col } from "antd";
import { InviteButton } from "../InvitesTableButtons/InviteBtn";
import { FilterBtn } from "../InvitesTableButtons/FilterBtn";
import { ReminderArray, Role, User } from "../../../pages/ManageUsers";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import { Invite } from "@qapita/fund-admin-client/src/services/invitations/contracts";
import { SearchBtn } from "../InvitesTableButtons/SearchBtn";
import { RolesOptions } from "../../UsersInvitesTabs";

// type UserButtonCollectionProps = {
//   users: User[] | [];
//   setUsers: (a: User[]) => void;
//   reminderArray: ReminderArray[];
//   setIsReminded: (a: boolean) => void;
//   setCheckAll: (a: boolean) => void;
//   roles: Role[];
//   setRoles: (a: Role[]) => void;
//   page: number;
//   setTotalResult: (a: number) => void;
//   itemsPerPage: number;
//   statusList: string[];
//   setStatusList: (a: string[]) => void;
//   roleList: string[];
//   setRoleList: (a: string[]) => void;
// };

type InviteButtonCollectionProps = {
  invites: Invite[] | [];
  setInvites: (a: Invite[]) => void;
  reminderArray: ReminderArray[];
  setIsReminded: (a: boolean) => void;
  setCheckAll: (a: boolean) => void;
  roles: Role[];
  setRoles: (a: Role[]) => void;
  page: number;
  setTotalResult: (a: number) => void;
  itemsPerPage: number;
  statusList: string[];
  setStatusList: (a: string[]) => void;
  roleList: string[];
  setRoleList: (a: string[]) => void;
  rolesOptions: RolesOptions[];
};

export const InvitesButtonCollection = ({
  invites,
  setInvites,
  reminderArray,
  setIsReminded,
  setCheckAll,
  roles,
  setRoles,
  page,
  setTotalResult,
  itemsPerPage,
  statusList,
  setStatusList,
  roleList,
  setRoleList,
  rolesOptions,
}: InviteButtonCollectionProps): ReactElement => {
  return (
    <div className="inviteTableBtnsRow">
      <div className="inviteTableSearchBtnCont">
        <SearchBtn
          setInvites={setInvites}
          page={page}
          setTotalResult={setTotalResult}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <div className="inviteTableBtnsCont">
        <FilterBtn
          roles={roles}
          setInvites={setInvites}
          page={page}
          setTotalResult={setTotalResult}
          itemsPerPage={itemsPerPage}
          statusList={statusList}
          setStatusList={setStatusList}
          roleList={roleList}
          setRoleList={setRoleList}
          rolesOptions={rolesOptions}
        />
        <div>
          <ReminderButton
            reminderArray={reminderArray}
            setIsReminded={setIsReminded}
            setCheckAll={setCheckAll}
          />
        </div>
        <div>
          <InviteButton
            invites={invites}
            setInvites={setInvites}
            roles={roles}
            page={page}
            setTotalResult={setTotalResult}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};
