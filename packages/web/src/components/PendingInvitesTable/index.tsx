import React, { ReactElement, useEffect, useContext, useState } from "react";
import "./usersTable.scss";
import { Pagination } from "antd";
import { InvitesTableHeader } from "./InvitesTableHeader";
import { InvitesTableRow } from "./InvitesTableRow";
import { ApplicationContext } from "../../Context/ApplicationContext/ApplicationContextProvider";
import { ReminderArray, User, Role } from "../../pages/ManageUsers";

type UsersTableProps = {
  users: User[] | [];
  setUsers: (a: User[]) => void;
  reminderArray: ReminderArray[] | [];
  setReminderArray: (a: ReminderArray[]) => void;
  isReminded: boolean;
  setIsReminded: (a: boolean) => void;
  setCheckAll: (a: boolean) => void;
  checkAll: boolean;
  roles: Role[];
  setRoles: (a: Role[]) => void;
  page: number;
  setPage: (a: number) => void;
  totalResult: number;
  setTotalResult: (a: number) => void;
  itemsPerPage: number;
  statusList: string[];
  roleList: string[];
};

export const InvitesTable = ({
  users,
  setUsers,
  reminderArray,
  setReminderArray,
  isReminded,
  setIsReminded,
  setCheckAll,
  checkAll,
  roles,
  setRoles,
  page,
  setPage,
  totalResult,
  setTotalResult,
  itemsPerPage,
  statusList,
  roleList,
}: UsersTableProps): ReactElement => {
  const { getClient, slugId } = useContext(ApplicationContext);
  const service = getClient().getInvitationsService();

  //getting invitations
  useEffect(() => {
    const status = statusList.toString();
    const roles = roleList.toString();

    const params = {
      page: page,
      page_size: itemsPerPage,
      status,
      roles,
    };

    service.getInvitations(params).then((res: any) => {
      setUsers(res.data);
      setTotalResult(res.totalCount);
      console.log("Invites");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, slugId, getClient]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className="usersgridContainer">
        {/* <InvitesTableHeader checkAll={checkAll} setCheckAll={setCheckAll} /> */}
        {/* {users?.map((user) => (
          <InvitesTableRow
            key={user.userInvitationId}
            user={user}
            setUsers={setUsers}
            reminderArray={reminderArray}
            setReminderArray={setReminderArray}
            isReminded={isReminded}
            setIsReminded={setIsReminded}
            checkAll={checkAll}
            roles={roles}
            setRoles={setRoles}
            page={page}
            itemsPerPage={itemsPerPage}
            statusList={statusList}
            roleList={roleList}
          />
        ))} */}
      </div>
      {/* <Pagination
        current={page}
        total={totalResult}
        pageSize={itemsPerPage}
        className="pagination"
        showSizeChanger={false}
        onChange={handlePageChange}
      /> */}
    </>
  );
};
