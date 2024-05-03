import React, { ReactElement, useState, useEffect, useContext } from "react";
import "./filterPopup.scss";
import "antd/dist/antd.css";
import { Button, Checkbox } from "antd";
import { ApplicationContext } from "../../../../../Context/ApplicationContext/ApplicationContextProvider";
import { User, Role } from "../../../../../pages/ManageUsers";
import { Invite } from "@qapita/fund-admin-client/src/services/invitations/contracts";

const statusOptions = [
  { label: "Invited", value: "Pending" },
  { label: "Accepted", value: "Completed" },
];

type RolesOptions = {
  label: string;
  value: string;
};

type FilterPopupProps = {
  roles: Role[];
  setInvites?: (a: Invite[]) => void;
  setUsers?: (a: User[]) => void;
  page: number;
  setTotalResult: (a: number) => void;
  itemsPerPage: number;
  rolesOptions: RolesOptions[];
  // statusList: string[];
  // setStatusList: (a: string[]) => void;
  roleList: string[];
  setRoleList: (a: string[]) => void;
  setVisible: (a: boolean) => void;
};

export const FilterPopup = ({
  roles,
  setInvites,
  setUsers,
  page,
  setTotalResult,
  itemsPerPage,
  rolesOptions,
  // statusList,
  // setStatusList,
  roleList,
  setRoleList,
  setVisible,
}: FilterPopupProps): ReactElement => {
  const { getClient, slugId } = useContext(ApplicationContext);
  const client = getClient().getInvitationsService();

  const handleOnStatusChange = (values) => {
    // setStatusList(values);
  };

  const handleOnRoleChange = (values) => {
    setRoleList(values);
  };

  const handleClearFilters = () => {
    setRoleList([]);
    // setStatusList([]);

    const params = {
      page: page,
      page_size: itemsPerPage,
    };

    if (setInvites) {
      client
        .getInvitations(params)
        .then((res: any) => {
          setInvites(res.data);
          setTotalResult(res.totalCount);
        })
        .then(() => setVisible(false));
    }

    if (setUsers) {
      client
        .getUser(params)
        .then((res: any) => {
          setUsers(res.data);
          setTotalResult(res.totalCount);
        })
        .then(() => setVisible(false));
    }
  };

  const handleApplyFilters = () => {
    // const status = statusList.toString();
    const roles = roleList.toString();

    const params = {
      page: page,
      page_size: itemsPerPage,
      status,
      roles,
    };

    if (setInvites) {
      client
        .getInvitations(params)
        .then((res: any) => {
          setInvites(res.data);
          setTotalResult(res.totalCount);
        })
        .then(() => setVisible(false));
    }

    if (setUsers) {
      client
        .getUser(params)
        .then((res: any) => {
          setUsers(res.data);
          setTotalResult(res.totalCount);
        })
        .then(() => setVisible(false));
    }
  };

  return (
    <>
      <div className="filterPopupCont">
        {/* <div className="filterTypeCont">
          <p className="filterType">Status</p>
          <ul>
            <li>
              <Checkbox.Group
                options={statusOptions}
                value={statusList}
                onChange={handleOnStatusChange}
              />
            </li>
          </ul>
        </div> */}

        <div className="filterTypeCont">
          <p className="filterType">Role</p>
          <ul>
            <li>
              <Checkbox.Group
                options={rolesOptions}
                value={roleList}
                onChange={handleOnRoleChange}
              />
            </li>
          </ul>
        </div>
      </div>

      <div className="filterBtnsCont">
        <Button
          type="text"
          className="clearFilterBtn"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
        <Button className="applyFilterBtn" onClick={handleApplyFilters}>
          Apply
        </Button>
      </div>
    </>
  );
};
