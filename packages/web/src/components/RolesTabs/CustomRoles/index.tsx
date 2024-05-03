import React, { useState } from "react";
import { Button } from "antd";
import "./customRoles.scss";
import { CustomRoleModal } from "./CustomRoleModal";

export const CustomRoles = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button className="customRolesBtn" onClick={() => setVisible(true)}>
        Add new role
      </Button>
      <CustomRoleModal
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
