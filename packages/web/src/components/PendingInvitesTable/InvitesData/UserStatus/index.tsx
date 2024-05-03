import React, { ReactElement } from "react";
import { Accepted } from "./Accepted";
import { Invited } from "./Invited";

type UserStatusProps = {
  status: {
    value: string;
  };
};

export const UserStatus = ({ status }: UserStatusProps): ReactElement => {
  return (
    <>
      {status.value === "Pending" ? <Invited /> : <Accepted />}
      {/* {status.value === "Accepted" && <Accepted />} */}
    </>
  );
};
