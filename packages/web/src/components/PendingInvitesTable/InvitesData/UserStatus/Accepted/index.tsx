import { CheckCircleFilled, MailOutlined } from "@ant-design/icons";
import React, { ReactElement } from "react";
import "../Invited/invited.scss";

export const Accepted = (): ReactElement => {
  return (
    <div className="statusCont">
      <CheckCircleFilled style={{ color: "green" }} />
      <p className="userStatus">Accepted</p>
    </div>
  );
};
