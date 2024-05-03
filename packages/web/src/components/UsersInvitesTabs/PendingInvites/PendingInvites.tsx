import React, { useState, useEffect, useContext } from "react";
import "./pendingInvites.scss";
import { Pagination } from "antd";
import { InvitesTable } from "../../PendingInvitesTable";
import {
  Invite,
  ReminderArray,
} from "../../../../../fund-admin-client/src/services/invitations/contracts";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import { InvitesTableHeader } from "../../PendingInvitesTable/InvitesTableHeader";
import { InvitesTableRow } from "../../PendingInvitesTable/InvitesTableRow";
import { Role } from "../../../pages/ManageUsers";
import { InvitesButtonCollection } from "../../PendingInvitesTable/InvitesButtonCollection";
import { RolesOptions } from "..";

type PendingInvitesProps = {
  roles: Role[];
  setRoles: (a: Role[]) => void;
  totalResult: number;
  setTotalResult: (a: number) => void;
  rolesOptions: RolesOptions[];
};

export const PendingInvites = ({
  roles,
  setRoles,
  totalResult,
  setTotalResult,
  rolesOptions,
}: PendingInvitesProps) => {
  const [page, setPage] = useState(1);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [statusList, setStatusList] = useState<string[]>([]);
  const [roleList, setRoleList] = useState<string[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const ITEMS_PER_PAGE = 5;
  const [reminderArray, setReminderArray] = useState<ReminderArray[]>([]);
  const [isReminded, setIsReminded] = useState(false);

  const { getClient, slugId } = useContext(ApplicationContext);

  const service = getClient().getInvitationsService();
  //getting invitations
  useEffect(() => {
    const status = statusList.toString();
    const roles = roleList.toString();

    const params = {
      page: page,
      page_size: ITEMS_PER_PAGE,
      status,
      roles,
    };

    service.getInvitations(params).then((res: any) => {
      setInvites(res.data);
      setTotalResult(res.totalCount);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, slugId, getClient]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="companiesTable_block">
      <div className="usersgridContainer">
        <InvitesButtonCollection
          invites={invites}
          setInvites={setInvites}
          reminderArray={reminderArray}
          setIsReminded={setIsReminded}
          setCheckAll={setCheckAll}
          roles={roles}
          setRoles={setRoles}
          page={page}
          setTotalResult={setTotalResult}
          itemsPerPage={ITEMS_PER_PAGE}
          statusList={statusList}
          setStatusList={setStatusList}
          roleList={roleList}
          setRoleList={setRoleList}
          rolesOptions={rolesOptions}
        />
        <InvitesTableHeader checkAll={checkAll} setCheckAll={setCheckAll} />
        {invites.map((invite) => (
          <InvitesTableRow
            key={invite.userInvitationId}
            invite={invite}
            setInvites={setInvites}
            reminderArray={reminderArray}
            setReminderArray={setReminderArray}
            isReminded={isReminded}
            setIsReminded={setIsReminded}
            checkAll={checkAll}
            roles={roles}
            setRoles={setRoles}
            page={page}
            itemsPerPage={ITEMS_PER_PAGE}
            statusList={statusList}
            roleList={roleList}
          />
        ))}
      </div>
      <Pagination
        current={page}
        total={totalResult}
        pageSize={ITEMS_PER_PAGE}
        className="pagination"
        showSizeChanger={false}
        onChange={handlePageChange}
      />
    </div>
  );
};
