import React from "react";
import { Checkbox, Popover } from "antd";

type UserTableHeaderProps = {
  checkAll: boolean;
  setCheckAll: (value: boolean) => void;
};

export const UserTableHeader = ({
  checkAll,
  setCheckAll,
}: UserTableHeaderProps) => {
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
