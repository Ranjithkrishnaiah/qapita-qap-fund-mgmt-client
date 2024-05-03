import { MailOutlined } from "@ant-design/icons";
import React, { ReactElement } from "react";
import "./invited.scss";

export const Invited = (): ReactElement => {
  return (
    <div className="statusCont">
      <MailOutlined style={{ color: "#BDBDBD" }} />
      <p className="userStatus">Invited</p>
    </div>
  );
};
