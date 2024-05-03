import React, { ReactElement, useContext, useState } from "react";
import "./moreBtnPopup.scss";
import { Button } from "antd";
import { User, Role, UserRole } from "../../../../../pages/ManageUsers";
import { RevokeModal } from "../../../Modal/Revoke";
import { Invite } from "@qapita/fund-admin-client/src/services/invitations/contracts";

type UserMoreBtnPopupProps = {
  num: number;
  invitationId: string;
  setInvites: (a: Invite[]) => void;
  firstName: string;
  lastName: string;
  status: {
    value: string;
  };
  roles: Role[];
  setRoles: (a: Role[]) => void;
  setVisible: (a: boolean) => void;
  page: number;
  itemsPerPage: number;
  statusList: string[];
  roleList: string[];
  userRoles: UserRole[];
  userId: string;
};

export const InviteMoreBtnPopup = ({
  num,
  invitationId,
  setInvites,
  firstName,
  lastName,
  status,
  roles,
  setRoles,
  setVisible,
  page,
  itemsPerPage,
  statusList,
  roleList,
  userRoles,
  userId,
}: UserMoreBtnPopupProps): ReactElement => {
  // const [deleteVisible, setDeleteVisible] = useState(false);
  // const [accessVisible, setAccessVisible] = useState(false);
  const [revokeVisible, setRevokeVisible] = useState(false);

  return (
    <>
      <div className="moreBtnPopupCont">
        {/* {status.value === "Completed" ? (
          <>
            <Button type="text" onClick={() => setAccessVisible(true)}>
              Change Access
            </Button>
            <br />
            <Button type="text" onClick={() => setDeleteVisible(true)}>
              Remove User
            </Button>
          </>
        ) : ( */}
        <Button type="text" onClick={() => setRevokeVisible(true)}>
          Revoke Invitation
        </Button>
        {/* )} */}
      </div>

      {/* Delete User Modal */}
      {/* <DeleteUserModal
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
        itemsPerPage={itemsPerPage}
        statusList={statusList}
        roleList={roleList}
      /> */}

      {/* Change Access Modal */}
      {/* <ChangeAccessModal
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
        itemsPerPage={itemsPerPage}
        statusList={statusList}
        roleList={roleList}
        setUsers={setUsers}
      /> */}

      {/* Revoke Invitataion Modal */}
      <RevokeModal
        visible={revokeVisible}
        setVisible={setRevokeVisible}
        onCancel={() => {
          setRevokeVisible(false);
        }}
        firstName={firstName}
        lastName={lastName}
        setInvites={setInvites}
        invitationId={invitationId}
        setPopupVisible={setVisible}
        page={page}
        itemsPerPage={itemsPerPage}
        statusList={statusList}
        roleList={roleList}
      />
    </>
  );
};
