import React, { useState, useEffect, useContext } from "react";
import "./users.scss";
import { Pagination } from "antd";
import { UserTableHeader } from "../../UsersTable/UserTableHeader";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import { UserTableRow } from "../../UsersTable/UserTableRow";
import { Role, User } from "../../../pages/ManageUsers";
import { UserButtonCollection } from "../../UsersTable/UserButtonCollection";
import { RolesOptions } from "..";

type UserProps = {
  roles: Role[];
  setRoles: (a: Role[]) => void;
  totalResult: number;
  setTotalResult: (a: number) => void;
  rolesOptions: RolesOptions[];
};

export const Users = ({
  roles,
  setRoles,
  totalResult,
  setTotalResult,
  rolesOptions,
}: UserProps) => {
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const [users, setUsers] = useState<User[]>([]);
  // const [totalResult, setTotalResult] = useState(0);
  const [checkAll, setCheckAll] = useState(false);
  // const [roles, setRoles] = useState<Role[]>([]);
  const [roleList, setRoleList] = useState<string[]>([]);
  const { getClient, slugId } = useContext(ApplicationContext);

  const service = getClient().getInvitationsService();

  useEffect(() => {
    service.getUser({ page, page_size: ITEMS_PER_PAGE }).then((res: any) => {
      setUsers(res.data);
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
        <UserButtonCollection
          users={users}
          setUsers={setUsers}
          roles={roles}
          setRoles={setRoles}
          page={page}
          setTotalResult={setTotalResult}
          itemsPerPage={ITEMS_PER_PAGE}
          roleList={roleList}
          setRoleList={setRoleList}
          rolesOptions={rolesOptions}
        />
        <UserTableHeader checkAll={checkAll} setCheckAll={setCheckAll} />
        {users.length !== 0 &&
          users?.map((user) => (
            <UserTableRow
              key={user.userInvitationId}
              user={user}
              setUsers={setUsers}
              page={page}
              pageSize={ITEMS_PER_PAGE}
              roles={roles}
              setRoles={setRoles}
              setTotalResult={setTotalResult}
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
