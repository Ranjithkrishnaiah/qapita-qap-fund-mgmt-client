import React, { ReactElement, useState, useEffect } from "react";
import "./userFilterBtn.scss";
import { Popover } from "antd";
import { FilterPopup } from "./FilterPopup";
import FilterIcon from "../../../shared/icons/FilterIcon";
import { User, Role } from "../../../../pages/ManageUsers";
import { Invite } from "@qapita/fund-admin-client/src/services/invitations/contracts";
import { RolesOptions } from "../../../UsersInvitesTabs";

type InviteFilterBtnProps = {
  roles: Role[];
  setInvites?: (a: Invite[]) => void;
  page: number;
  setTotalResult: (a: number) => void;
  itemsPerPage: number;
  statusList?: string[];
  setStatusList?: (a: string[]) => void;
  roleList: string[];
  setRoleList: (a: string[]) => void;
  rolesOptions: RolesOptions[];
};

// type RolesOptions = {
//   label: string;
//   value: string;
// };

export const FilterBtn = ({
  roles,
  setInvites,
  page,
  setTotalResult,
  itemsPerPage,
  statusList,
  setStatusList,
  roleList,
  setRoleList,
  rolesOptions,
}: InviteFilterBtnProps): ReactElement => {
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
            setInvites={setInvites}
            page={page}
            setTotalResult={setTotalResult}
            itemsPerPage={itemsPerPage}
            rolesOptions={rolesOptions}
            // statusList={statusList}
            // setStatusList={setStatusList}
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
