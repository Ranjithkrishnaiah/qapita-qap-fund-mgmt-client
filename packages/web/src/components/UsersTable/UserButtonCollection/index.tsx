import React, { useContext, useEffect } from "react";
import "./userBtnCollection.scss";
import { UserFilterBtn } from "../UsersTableButtons/UserFilterBtn";
import { UserSearchBtn } from "../UsersTableButtons/UserSearchBtn";
import { Role, User } from "../../../pages/ManageUsers";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import { FilterBtn } from "../../PendingInvitesTable/InvitesTableButtons/FilterBtn";
import { RolesOptions } from "../../UsersInvitesTabs";

type UserBtnCollectionProps = {
  users: User[] | [];
  setUsers: (a: User[]) => void;
  roles: Role[];
  setRoles: (a: Role[]) => void;
  page: number;
  setTotalResult: (a: number) => void;
  itemsPerPage: number;
  roleList: string[];
  setRoleList: (a: string[]) => void;
  rolesOptions: RolesOptions[];
};

export const UserButtonCollection = ({
  users,
  setUsers,
  roles,
  setRoles,
  page,
  setTotalResult,
  itemsPerPage,
  roleList,
  setRoleList,
  rolesOptions,
}: UserBtnCollectionProps) => {
  return (
    <div className="userTableBtnsRow">
      <div className="userTableSearchBtnCont">
        <UserSearchBtn
          setUsers={setUsers}
          page={page}
          setTotalResult={setTotalResult}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <div className="userTableBtnsCont">
        <UserFilterBtn
          roles={roles}
          setUsers={setUsers}
          page={page}
          setTotalResult={setTotalResult}
          itemsPerPage={itemsPerPage}
          roleList={roleList}
          setRoleList={setRoleList}
          rolesOptions={rolesOptions}
        />
      </div>
    </div>
  );
};
