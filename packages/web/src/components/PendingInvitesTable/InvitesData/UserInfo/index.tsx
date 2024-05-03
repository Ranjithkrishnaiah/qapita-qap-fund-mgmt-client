import React, { ReactElement } from "react";
import { Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./userInfo.scss";
import { UserRole } from "../../../../pages/ManageUsers";

type UserInfoProps = {
  firstName: string;
  lastName: string;
  roles: UserRole[];
};

export const UserInfo = ({
  firstName,
  lastName,
  roles,
}: UserInfoProps): ReactElement => {
  const rolesPopover = (
    <div>
      {roles?.map((role) => {
        return (
          <div className="rolePopoverCont" key={role.roleId}>
            <p className="userRolePopover">{role.name}</p>
          </div>
        );
      })}
    </div>
  );

  const title = <p className="rolesPopoverTitle">Roles</p>;

  return (
    <div className="userInfoCont">
      <Avatar size={42} icon={<UserOutlined />} className="userAvatar" />
      <div className="userNameCont">
        <p className="userName">
          {firstName} {lastName}
        </p>

        <p className="userRole">
          {roles[0].name}{" "}
          {roles.length > 1 && (
            <Popover content={rolesPopover} placement="bottomRight">
              {" "}
              <span>+{roles.length - 1}more</span>{" "}
            </Popover>
          )}{" "}
        </p>
        {/* {roles.map((role) => (
          <p className="userRole" key={role.roleId}>
            {role.name}
          </p>
        ))} */}
      </div>
    </div>
  );
};
