import React, { ReactElement, useEffect, useState, useContext } from "react";
import "./tableRow.scss";
import { UserInfo } from "../InvitesData/UserInfo";
import { Checkbox } from "antd";
import { UserEmail } from "../InvitesData/UserEmail";
import { UserFund } from "../InvitesData/UserFund";
import { UserStatus } from "../InvitesData/UserStatus";
import { InvitesMoreBtn } from "../InvitesTableButtons/MoreBtn";
import { ReminderArray, User, Role } from "../../../pages/ManageUsers";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import { Invite } from "@qapita/fund-admin-client/src/services/invitations/contracts";

type InviteRowProps = {
  invite: Invite;
  setInvites: (a: Invite[]) => void;
  reminderArray: ReminderArray[];
  setReminderArray: (a: ReminderArray[]) => void;
  isReminded: boolean;
  setIsReminded: (a: boolean) => void;
  checkAll: boolean;
  roles: Role[];
  setRoles: (a: Role[]) => void;

  page: number;
  itemsPerPage: number;
  statusList: string[];
  roleList: string[];
};

export const InvitesTableRow = ({
  invite,
  setInvites,
  reminderArray,
  setReminderArray,
  isReminded,
  setIsReminded,
  checkAll,
  roles,
  setRoles,
  page,
  itemsPerPage,
  statusList,
  roleList,
}: InviteRowProps): ReactElement => {
  const [isChecked, setIsChecked] = useState(false);
  const { slugId } = useContext(ApplicationContext);
  const payload = {
    slugId: slugId,
    invitationId: invite.userInvitationId,
  };

  const handleOnChange = (e) => {
    setIsReminded(false);
    setIsChecked((prev) => !prev);

    if (e.target.checked) {
      reminderArray.push(payload);
    } else {
      const updatedArray = reminderArray.filter(
        (el) => el.invitationId !== invite.userInvitationId
      );
      setReminderArray(updatedArray);
    }
  };

  useEffect(() => {
    setIsChecked(checkAll);

    if (checkAll && invite.userInvitationStatus.value === "Pending") {
      reminderArray.push(payload);
    } else if (checkAll === false) {
      setReminderArray([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkAll]);

  return (
    <div className="usersTableBody usersGridElement">
      <Checkbox
        onChange={handleOnChange}
        checked={isReminded ? false : isChecked}
        disabled={
          invite.userInvitationStatus.value === "Completed" ? true : false
        }
      >
        <UserInfo
          firstName={invite.firstName}
          lastName={invite.lastName}
          roles={invite.userRoles}
        />
      </Checkbox>
      <UserEmail email={invite.email} />
      <UserFund />
      {/* <UserStatus status={invite.userInvitationStatus} /> */}
      <InvitesMoreBtn
        invitationId={invite.userInvitationId}
        setInvites={setInvites}
        firstName={invite.firstName}
        lastName={invite.lastName}
        status={invite.userInvitationStatus}
        roles={roles}
        setRoles={setRoles}
        page={page}
        itemsPerPage={itemsPerPage}
        statusList={statusList}
        roleList={roleList}
        userRoles={invite.userRoles}
        userId={invite.userId}
      />
    </div>
  );
};
