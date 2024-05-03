import React, { ReactElement } from "react";
import "./userEmail.scss";

type UserEmailProps = {
  email: string;
};

export const UserEmail = ({ email }: UserEmailProps): ReactElement => {
  return (
    <div className="userEmailCont">
      <p className="userEmail">{email}</p>
    </div>
  );
};
