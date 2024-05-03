import React, { ReactElement, useState } from "react";
import "./userTableMoreBtn.scss";
import { MoreOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { InviteMoreBtnPopup } from "./MoreBtnPopup";
import { User, Role, UserRole } from "../../../../pages/ManageUsers";
import { Invite } from "@qapita/fund-admin-client/src/services/invitations/contracts";

type InviteMoreBtnProps = {
  invitationId: string;
  setInvites: (a: Invite[]) => void;
  firstName: string;
  lastName: string;
  status: {
    value: string;
  };
  roles: Role[];
  setRoles: (a: Role[]) => void;
  page: number;
  itemsPerPage: number;
  statusList: string[];
  roleList: string[];
  userRoles: UserRole[];
  userId: string;
};

export const InvitesMoreBtn = ({
  invitationId,
  setInvites,
  firstName,
  lastName,
  status,
  roles,
  setRoles,
  page,
  itemsPerPage,
  statusList,
  roleList,
  userRoles,
  userId,
}: InviteMoreBtnProps): ReactElement => {
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
          <InviteMoreBtnPopup
            num={1}
            invitationId={invitationId}
            setInvites={setInvites}
            firstName={firstName}
            lastName={lastName}
            status={status}
            roles={roles}
            setRoles={setRoles}
            setVisible={setVisible}
            page={page}
            itemsPerPage={itemsPerPage}
            statusList={statusList}
            roleList={roleList}
            userRoles={userRoles}
            userId={userId}
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
