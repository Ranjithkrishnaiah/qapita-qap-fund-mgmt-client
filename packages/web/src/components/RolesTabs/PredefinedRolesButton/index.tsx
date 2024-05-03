import React, { useState } from "react";
import "./predefinedRolesButtons.scss";
import { Radio, Divider } from "antd";

type PredefinedRolesButtonsProps = {
  setRoleType: (a: string) => void;
};

export const PredefinedRolesButtons = ({
  setRoleType,
}: PredefinedRolesButtonsProps) => {
  const onChange = (e) => {
    setRoleType(e.target.value);
  };

  return (
    <div>
      <p className="manageRolesHeading">User roles and permissions </p>
      <Radio.Group onChange={onChange} defaultValue="FIRM-ADMIN">
        <Radio className="predefinedRolesRadio" value="FIRM-ADMIN">
          Firm-Admin
        </Radio>
        <Radio className="predefinedRolesRadio" value="FUND-ADMIN">
          Fund-Admin
        </Radio>
        {/* <Radio className="predefinedRolesRadio" value="EMPLOYEE">
          Employee
        </Radio>
        <Radio className="predefinedRolesRadio" value="INVESTOR">
          Investor
        </Radio> */}
      </Radio.Group>
      <Divider />
    </div>
  );
};
