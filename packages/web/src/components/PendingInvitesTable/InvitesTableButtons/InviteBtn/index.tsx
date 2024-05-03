import React, { ReactElement, useState } from "react";
import "../ReminderBtn/reminderBtn.scss";
import { Button } from "antd";
import { InviteUserModal } from "../../Modal/InviteUser";
import { User, Role } from "../../../../pages/ManageUsers";
import { Invite } from "@qapita/fund-admin-client/src/services/invitations/contracts";

type InviteButtonProps = {
  invites: Invite[] | [];
  setInvites: (a: Invite[]) => void;
  roles: Role[];
  page: number;
  setTotalResult: (a: number) => void;
  itemsPerPage: number;
};

export const InviteButton = ({
  invites,
  setInvites,
  roles,
  page,
  setTotalResult,
  itemsPerPage,
}: InviteButtonProps): ReactElement => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* <Button
        className="userTableBtn"
        value="large"
        onClick={() => setVisible(true)}
      >
        Invite User
      </Button> */}
      <button onClick={() => setVisible(true)} className="inviteUserBtn">
        Invite User
      </button>
      <InviteUserModal
        visible={visible}
        setVisible={setVisible}
        onCancel={() => {
          setVisible(false);
        }}
        setInvites={setInvites}
        roles={roles}
        page={page}
        setTotalResult={setTotalResult}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};
