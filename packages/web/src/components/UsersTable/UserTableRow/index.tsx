// import { User } from "@qapita/fund-admin-client/src/services/invitations/contracts";
import { Checkbox } from "antd";
import React, { useState } from "react";
import { Role, User } from "../../../pages/ManageUsers";
import { UserEmail } from "../../PendingInvitesTable/InvitesData/UserEmail";
import { UserFund } from "../../PendingInvitesTable/InvitesData/UserFund";
import { UserInfo } from "../../PendingInvitesTable/InvitesData/UserInfo";
import { UserMoreBtn } from "../UsersTableButtons/MoreBtn";

type UserTableRowProps = {
  user: User;
  setUsers: (a: User[]) => void;
  page: number;
  pageSize: number;
  roles: Role[];
  setRoles: (a: Role[]) => void;
  setTotalResult: (a: number) => void;
};

export const UserTableRow = ({
  user,
  setUsers,
  page,
  pageSize,
  roles,
  setRoles,
  setTotalResult,
}: UserTableRowProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="usersTableBody usersGridElement">
      <Checkbox onChange={handleOnChange}>
        <UserInfo
          firstName={user.firstName}
          lastName={user.lastName}
          roles={user.userRoles}
        />
      </Checkbox>
      <UserEmail email={user.email} />
      <UserFund />
      {/* <UserStatus status={invite.userInvitationStatus} /> */}
      {/* User More Button */}
      <UserMoreBtn
        userId={user.userId}
        firstName={user.firstName}
        lastName={user.lastName}
        setUsers={setUsers}
        invitationId={user.userInvitationId}
        page={page}
        pageSize={pageSize}
        roles={roles}
        setRoles={setRoles}
        userRoles={user.userRoles}
        setTotalResult={setTotalResult}
      />
    </div>
  );
};
