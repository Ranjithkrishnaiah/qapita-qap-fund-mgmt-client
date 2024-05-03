import React, { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { UserMoreBtnPopUp } from "./MoreBtnPopUp";
import { Role, User, UserRole } from "../../../../pages/ManageUsers";

type UserMoreBtnProps = {
  userId: string;
  firstName: string;
  lastName: string;
  setUsers: (a: User[]) => void;
  invitationId: string;
  page: number;
  pageSize: number;
  roles: Role[];
  setRoles: (a: Role[]) => void;
  userRoles: UserRole[];
  setTotalResult: (a: number) => void;
};

export const UserMoreBtn = ({
  userId,
  firstName,
  lastName,
  setUsers,
  invitationId,
  page,
  pageSize,
  roles,
  setRoles,
  userRoles,
  setTotalResult,
}: UserMoreBtnProps) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (bool) => {
    setVisible(bool);
  };

  return (
    <div className="userTableMoreBtnCont">
      <Popover
        visible={visible}
        onVisibleChange={handleVisibleChange}
        content={
          <UserMoreBtnPopUp
            firstName={firstName}
            lastName={lastName}
            setUsers={setUsers}
            invitationId={invitationId}
            userId={userId}
            setVisible={setVisible}
            page={page}
            pageSize={pageSize}
            roles={roles}
            setRoles={setRoles}
            userRoles={userRoles}
            setTotalResult={setTotalResult}
          />
        }
        trigger="click"
        placement="left"
      >
        <MoreOutlined className="userTableMoreBtn" />
      </Popover>
    </div>
  );
};
