import React, { useContext } from "react";
import "antd/dist/antd.css";
import { Button, Checkbox } from "antd";
import { Role, User } from "../../../../../pages/ManageUsers";
import { ApplicationContext } from "../../../../../Context/ApplicationContext/ApplicationContextProvider";

type RolesOptions = {
  label: string;
  value: string;
};

type UserFilterPopupProps = {
  roles: Role[];
  setUsers: (a: User[]) => void;
  page: number;
  setTotalResult: (a: number) => void;
  itemsPerPage: number;
  rolesOptions: RolesOptions[];
  roleList: string[];
  setRoleList: (a: string[]) => void;
  setVisible: (a: boolean) => void;
};

export const UserFilterPopup = ({
  roles,
  setUsers,
  page,
  setTotalResult,
  itemsPerPage,
  rolesOptions,
  roleList,
  setRoleList,
  setVisible,
}: UserFilterPopupProps) => {
  const { getClient } = useContext(ApplicationContext);
  const client = getClient().getInvitationsService();

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

    client
      .getUser(params)
      .then((res: any) => {
        setUsers(res.data);
        setTotalResult(res.totalCount);
      })
      .then(() => setVisible(false));
  };

  const handleApplyFilters = () => {
    // const status = statusList.toString();
    const roles = roleList.toString();

    const params = {
      page: page,
      page_size: itemsPerPage,
      roles,
    };

    client
      .getUser(params)
      .then((res: any) => {
        setUsers(res.data);
        setTotalResult(res.totalCount);
      })
      .then(() => setVisible(false));
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
