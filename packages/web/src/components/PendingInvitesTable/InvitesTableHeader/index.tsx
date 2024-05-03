import React, { ReactElement, useState, useEffect } from "react";
import "./tableHeader.scss";
import { Checkbox } from "antd";

type UsersTableHeaderProps = {
  setCheckAll: (a: boolean) => void;
  checkAll: boolean;
};

export const InvitesTableHeader = ({
  setCheckAll,
  checkAll,
}: UsersTableHeaderProps): ReactElement => {
  const handleOnChange = (e) => {
    setCheckAll(e.target.checked);
  };

  return (
    <div className="usersTableHeader usersGridElement">
      <div className="headerText">
        <Checkbox onChange={handleOnChange} checked={checkAll}>
          Users
        </Checkbox>
      </div>
      <div className="headerText">
        <h4>Email</h4>
      </div>
      <div className="headerText">
        <h4>Fund</h4>
      </div>
      <div></div>
    </div>
  );
};
