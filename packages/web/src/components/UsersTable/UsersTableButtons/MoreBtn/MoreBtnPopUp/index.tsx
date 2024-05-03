import { Button } from "antd";
import React, { useState } from "react";
import { Role, User, UserRole } from "../../../../../pages/ManageUsers";
import { ChangeAccessModal } from "../../../Modals/ChangeAccess";
import { DeleteUserModal } from "../../../Modals/DeleteUser";

type UserMoreBtnPopUpProps = {
  firstName: string;
  lastName: string;
  setUsers: (a: User[]) => void;
  invitationId: string;
  userId: string;
  setVisible: (a: boolean) => void;
  page: number;
  pageSize: number;
  roles: Role[];
  setRoles: (a: Role[]) => void;
  userRoles: UserRole[];
  setTotalResult: (a: number) => void;
};

export const UserMoreBtnPopUp = ({
  firstName,
  lastName,
  setUsers,
  invitationId,
  userId,
  setVisible,
  page,
  pageSize,
  roles,
  setRoles,
  userRoles,
  setTotalResult,
}: UserMoreBtnPopUpProps) => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [accessVisible, setAccessVisible] = useState(false);

  return (
    <>
      <div className="moreBtnPopupCont">
        <>
          <Button type="text" onClick={() => setAccessVisible(true)}>
            Change Access
          </Button>
          <br />
          <Button type="text" onClick={() => setDeleteVisible(true)}>
            Remove User
          </Button>
        </>
      </div>

      {/* Delete User Modal */}
      <DeleteUserModal
        visible={deleteVisible}
        setVisible={setDeleteVisible}
        onCancel={() => {
          setDeleteVisible(false);
        }}
        firstName={firstName}
        lastName={lastName}
        setUsers={setUsers}
        invitationId={invitationId}
        setPopupVisible={setVisible}
        userId={userId}
        page={page}
        pageSize={pageSize}
        setTotalResult={setTotalResult}
      />

      {/* Change Access Modal */}
      <ChangeAccessModal
        visible={accessVisible}
        onCancel={() => setAccessVisible(false)}
        firstName={firstName}
        lastName={lastName}
        roles={roles}
        setRoles={setRoles}
        setPopupVisible={setVisible}
        userRoles={userRoles}
        userId={userId}
        page={page}
        pageSize={pageSize}
        // statusList={statusList}
        // roleList={roleList}
        setUsers={setUsers}
      />
    </>
  );
};
