import React, { useEffect, useState } from "react";
import { Popover } from "antd";
import { UserFilterPopup } from "./UserFilterPopup";
import FilterIcon from "../../../shared/icons/FilterIcon";
import { Role, User } from "../../../../pages/ManageUsers";
import { FilterPopup } from "../../../PendingInvitesTable/InvitesTableButtons/FilterBtn/FilterPopup";

type UserFilterBtnProps = {
  roles: Role[];
  setUsers: (a: User[]) => void;
  page: number;
  setTotalResult: (a: number) => void;
  itemsPerPage: number;
  roleList: string[];
  setRoleList: (a: string[]) => void;
  rolesOptions: RolesOptions[];
};

type RolesOptions = {
  label: string;
  value: string;
};

export const UserFilterBtn = ({
  roles,
  setUsers,
  page,
  setTotalResult,
  itemsPerPage,
  roleList,
  setRoleList,
  rolesOptions,
}: UserFilterBtnProps) => {
  const text = <span style={{ color: "#633ea5" }}>Filters</span>;
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (bool) => {
    setVisible(bool);
  };

  return (
    <div>
      <Popover
        placement="bottomRight"
        title={text}
        visible={visible}
        onVisibleChange={handleVisibleChange}
        content={
          <FilterPopup
            roles={roles}
            setUsers={setUsers}
            page={page}
            setTotalResult={setTotalResult}
            itemsPerPage={itemsPerPage}
            rolesOptions={rolesOptions}
            roleList={roleList}
            setRoleList={setRoleList}
            setVisible={setVisible}
          />
        }
        trigger="click"
      >
        <div className="filterIconDiv">
          <FilterIcon />
        </div>
      </Popover>
    </div>
  );
};
